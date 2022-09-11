import { logger } from "./../utils/logger";
import {
  CreatePostInput,
  GetPostInput,
  GetPostsInput,
  UpdatePostInput,
} from "./../schemas/post.schema";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { createItem, updateItem } from "../services/item.service";
import {
  createPost,
  findPost,
  findPosts,
  updatePost,
} from "../services/post.service";

export async function createPostHandler(
  req: Request<{}, {}, CreatePostInput["body"]>,
  res: Response
) {
  try {
    const userId = res.locals.user.id;

    const item = await createItem(req.body.item);
    req.body.item = item;
    const post = await createPost({ ...req.body, user: { id: userId } });

    return res.status(StatusCodes.CREATED).send(post);
  } catch (err: any) {
    logger.error("Error location is createPostHandler:", err);

    return res.status(StatusCodes.BAD_REQUEST).send({ message: err.message });
  }
}

export async function getPostHandler(
  req: Request<GetPostInput["params"]>,
  res: Response
) {
  const { postId } = req.params;
  const post = await findPost({ where: { id: postId } });
  if (!post)
    return res
      .status(StatusCodes.NOT_FOUND)
      .send({ message: "Post is not found" });

  await updatePost({ id: post.id }, { viewCount: post.viewCount + 1 });

  return res.status(StatusCodes.OK).send(post);
}

export async function getPostsHandler(
  req: Request<{}, {}, {}, GetPostsInput["query"]>,
  res: Response
) {
  const posts = await findPosts({ where: { ...req.query } });

  return res.status(StatusCodes.OK).send(posts);
}

export async function updatePostHandler(
  req: Request<UpdatePostInput["params"], {}, UpdatePostInput["body"]>,
  res: Response
) {
  const userId = res.locals.user.id;
  const { postId } = req.params;

  const post = await findPost({ where: { id: postId } });
  if (!post)
    return res
      .status(StatusCodes.NOT_FOUND)
      .send({ message: "there's no post with that id" });

  if (post.user.id !== userId)
    return res
      .status(StatusCodes.FORBIDDEN)
      .send({ message: "you're not have access to this resources" });

  if (req.body.hasOwnProperty("item")) {
    await updateItem({ id: post.item.id }, req.body.item);
  }

  const { ["item"]: _, ...updatePostInput } = req.body;

  await updatePost({ id: postId }, updatePostInput);

  return res.status(StatusCodes.OK).send({ message: "success updating post" });
}
