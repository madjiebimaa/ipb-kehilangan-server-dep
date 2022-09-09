import { ItemCharacteristic, ItemImage } from "./../entities/item.entity";
import z from "zod";

export const itemImageSchema = z.instanceof(ItemImage);
export const itemCharacteristicSchema = z.instanceof(ItemCharacteristic);

export const body = {
  body: z.object({
    name: z
      .string({ required_error: "Name is required" })
      .max(100, { message: "Must be 100 or fewer characters long" }),
    imageUrls: itemImageSchema.array(),
    characteristics: itemCharacteristicSchema.array(),
  }),
};

export const createItemSchema = z.object({
  ...body,
});

export type CreateItemInput = z.TypeOf<typeof createItemSchema>;
