import { DeepPartial, FindManyOptions } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { FindOptionsWhere } from "typeorm";
import { FindOneOptions } from "typeorm";
import { logger } from "./../utils/logger";
import { Post } from "../entities/post.entity";

export async function createPost(input: DeepPartial<Post>) {
  try {
    const post = Post.create(input);
    await post.save();
    return post;
  } catch (err: any) {
    logger.error("Error during inserting post to DB:", err);
    throw new Error(err);
  }
}

export async function findPost(query: FindOneOptions<Post>) {
  return await Post.findOne({
    ...query,
    relations: { item: true, user: true },
  });
}

export async function findPosts(query?: FindManyOptions<Post>) {
  return await Post.find({ ...query, relations: { item: true, user: true } });
}

export async function updatePost(
  query: FindOptionsWhere<Post>,
  update: QueryDeepPartialEntity<Post>
) {
  return await Post.update(query, update);
}
