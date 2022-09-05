import z from "zod";

// !FIX: redundance nested from different schema path
export const body = {
  body: z.object({
    lostDate: z.string().optional(),
    lostLocation: z
      .string()
      .max(200, { message: "must be 200 or fewer characters long" })
      .optional(),
    item: z.object({
      name: z
        .string({ required_error: "name is required" })
        .max(100, { message: "must be 100 or fewer characters long" }),
      image: z
        .string({ required_error: "image is required" })
        .url({ message: "invalid url" }),
      characteristics: z.string({
        required_error: "characteristics is required",
      }),
    }),
  }),
};

export const params = {
  params: z.object({
    postId: z.string({ required_error: "postId is required" }),
  }),
};

export const query = {
  query: z.object({
    lostStatus: z.string().optional(),
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
