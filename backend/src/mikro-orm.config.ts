import { __prod__ } from "./constants";
import { User } from "./entities/User";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import dotenv from "dotenv";
import { Post } from "./entities/Post";

dotenv.config();

export default {
  dbName: process.env.PG_DB!,
  password: process.env.PG_PW!,
  user: process.env.PG_USER!,
  type: "postgresql",
  debug: !__prod__,
  entities: [User, Post],
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
} as Parameters<typeof MikroORM.init>[0];
