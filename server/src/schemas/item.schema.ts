import z from "zod";

export const body = {
  body: z.object({
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
};

export const createItemSchema = z.object({
  ...body,
});

export type CreateItemInput = z.TypeOf<typeof createItemSchema>;
