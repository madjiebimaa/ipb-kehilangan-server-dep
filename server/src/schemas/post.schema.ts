import { ItemImage, ItemCharacteristic } from "./../entities/item.entity";
import { PostLostStatus } from "./../entities/post.entity";
import z from "zod";

export const itemImageSchema = z.instanceof(ItemImage);
export const itemCharacteristicSchema = z.instanceof(ItemCharacteristic);

// !FIX: redundance nested from different schema path
export const body = {
  body: z.object({
    lostStatus: z.nativeEnum(PostLostStatus).optional(),
    lostDate: z.string().optional(),
    lostLocation: z
      .string()
      .max(200, { message: "Must be 200 or fewer characters long" })
      .optional(),
    item: z
      .object({
        name: z
          .string({ required_error: "Name is required" })
          .max(100, { message: "Must be 100 or fewer characters long" }),
        imageUrls: itemImageSchema.array().optional(),
        characteristics: itemCharacteristicSchema.array().optional(),
      })
      .deepPartial(),
  }),
};

export const params = {
  params: z.object({
    postId: z.string({ required_error: "PostId is required" }),
  }),
};

export const query = {
  query: z.object({
    lostStatus: z.string().optional(),
    itemName: z.string().optional(),
  }),
};

export const createPostSchema = z.object({
  ...body,
});

export const getPostSchema = z.object({
  ...params,
});

export const getPostsSchema = z.object({
  ...query,
});

export const updatePostSchema = z.object({
  ...params,
  ...body,
});

export const deletePostSchema = z.object({
  ...params,
});

export type CreatePostInput = z.TypeOf<typeof createPostSchema>;
export type GetPostInput = z.TypeOf<typeof getPostSchema>;
export type GetPostsInput = z.TypeOf<typeof getPostsSchema>;
export type UpdatePostInput = z.TypeOf<typeof updatePostSchema>;
export type DeletePostInput = z.TypeOf<typeof deletePostSchema>;
