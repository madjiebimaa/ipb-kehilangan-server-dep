import z from "zod";

export const body = {
  body: z.object({
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
};

export const createItemSchema = z.object({
  ...body,
});

export type CreateItemInput = z.TypeOf<typeof createItemSchema>;
