import { config } from "dotenv";
import { createConnection } from "typeorm";
import path from "path";
import { User } from "./entity/UserEntity";

config();

export const dbConnection = () =>
  createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [User],
    synchronize: true,
  });
