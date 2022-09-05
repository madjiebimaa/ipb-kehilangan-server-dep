import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { DeepPartial, FindOneOptions, FindOptionsWhere } from "typeorm";
import { logger } from "./../utils/logger";
import { Item } from "../entities/item.entity";

export async function createItem(input: DeepPartial<Item>) {
  try {
    const item = Item.create(input);
    await item.save();
    return item;
  } catch (err: any) {
    logger.info("Error during inserting item to DB:", err);
    throw new Error(err);
  }
}

export async function getItem(query: FindOneOptions<Item>) {
  return await Item.findOne(query);
}

export async function updateItem(
  query: FindOptionsWhere<Item>,
  update: QueryDeepPartialEntity<Item>
) {
  return await Item.update(query, update);
}
