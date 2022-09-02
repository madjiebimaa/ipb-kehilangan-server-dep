import { Item } from "./entities/Item";
import { Post } from "./entities/Post";
import "reflect-metadata";
import { config } from "dotenv";
import { DataSource } from "typeorm";
import { User } from "./entities/User";

config();

const { DB_TYPE, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } =
  process.env;

export const AppDataSource = new DataSource({
  type: DB_TYPE as "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT as string),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [User, Post, Item],
  synchronize: true,
  logging: true,
  // subscribers: [],
  // migrations: [],
});
