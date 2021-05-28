import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { dbConnection } from "./db";
import { buildSchema } from "type-graphql";
import { AuthResolver } from "./resolvers/AuthResolver";
import expressSession from "express-session";
import dotenv from "dotenv";
import { SESSION_COOKIE_NAME } from "./constats";
import cors from "cors";
import redisStore from "connect-redis";
import redis from "redis";

dotenv.config();

(async () => {
  const PORT = process.env.PORT || 5050;

  await dbConnection();

  const RedisStore = redisStore(expressSession);

  const redisClient = redis.createClient();

  const app = express();

  app.use(
    expressSession({
      name: SESSION_COOKIE_NAME,
      cookie: {
        signed: true,
        httpOnly: true,
        sameSite: "lax",
      },
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(
    cors({
      credentials: true,
      origin: process.env.CORS_ORIGIN,
    })
  );

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [AuthResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
    }),
  });

  server.applyMiddleware({ app, cors: false });

  app.listen(PORT, () => {
    console.log(`App Running on http://localhost:${PORT}`);
  });
})().catch(console.error);
