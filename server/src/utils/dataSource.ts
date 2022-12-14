import { ItemImage, ItemCharacteristic } from "./../entities/item.entity";
import "reflect-metadata";
import { Item } from "../entities/item.entity";
import { Post } from "../entities/post.entity";
import { User } from "../entities/user.entity";
import { config } from "dotenv";
import { DataSource } from "typeorm";
import { Session } from "../entities/session.entity";
import { logger } from "./logger";

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
  entities: [User, Post, Item, ItemImage, ItemCharacteristic, Session],
  synchronize: true,
  logging: true,
  // subscribers: [],
  // migrations: [],
});

export const initializeDataSource = async () => {
  try {
    await AppDataSource.initialize();
    logger.info("Data Source has been initialized!");
  } catch (err: any) {
    logger.error("Error during Data Source initialization:", err);
    process.exit(1);
  }
};
