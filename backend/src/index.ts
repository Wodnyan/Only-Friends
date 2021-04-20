import "reflect-metadata";
import { PORT, SESSION_COOKIE_NAME, __prod__ } from "./constants";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { connection } from "./db";
import dotenv from "dotenv";
import express from "express";
import redis from "redis";
import session from "express-session";
import cors from "cors";

import connectRedis from "connect-redis";

import { PostResolver } from "./resolvers/post";
import { HelloResolver } from "./resolvers/hello";
import { UserResolver } from "./resolvers/user";

dotenv.config();

(async () => {
  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();
  const orm = await connection();
  await orm.getMigrator().up();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver, PostResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ em: orm.em, req, res }),
  });

  const app = express();

  // Middlewares
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(
    session({
      name: SESSION_COOKIE_NAME,
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 5, // 5 years
        secure: __prod__,
        sameSite: "lax",
        httpOnly: true,
      },
      saveUninitialized: false,
      secret: "Change this",
      resave: false,
    })
  );

  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: false,
    },
  });

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
})().catch(console.log);
