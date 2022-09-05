import z from "zod";

// !FIX: redundance nested from different schema path
export const body = {
  body: z.object({
    lostDate: z.string().optional(),
    lostLocation: z
      .string()
      .max(200, { message: "Must be 200 or fewer characters long" })
      .optional(),
    item: z.object({
      name: z
        .string({ required_error: "Name is required" })
        .max(100, { message: "Must be 100 or fewer characters long" }),
      imageUrl: z
        .string({ required_error: "Image URL is required" })
        .url({ message: "Invalid url" }),
      characteristics: z.string({
        required_error: "Characteristics is required",
      }),
    }),
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

export type CreatePostInput = z.TypeOf<typeof createPostSchema>;
export type GetPostInput = z.TypeOf<typeof getPostSchema>;
export type GetPostsInput = z.TypeOf<typeof getPostsSchema>;
export type UpdatePostInput = z.TypeOf<typeof updatePostSchema>;
