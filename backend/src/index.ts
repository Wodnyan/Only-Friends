import "reflect-metadata";
import { PORT, __prod__ } from "./constants";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { UserResolver } from "./resolvers/user";
import { connection } from "./db";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

(async () => {
  const orm = await connection();
  await orm.getMigrator().up();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  });

  const app = express();

  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
})().catch(console.log);
