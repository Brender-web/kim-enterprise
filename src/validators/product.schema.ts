import { z } from "zod"

export const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().positive(),
  currency: z.string().default("KES"),
  images: z.array(z.string()).min(1, "At least one image is required"),
  category: z.enum(["ELECTRONICS", "FASHION", "HOME", "BEAUTY", "ACCESSORIES", "SPORTS", "FOOD", "BOOKS", "AUTOMOTIVE"]),
  stock: z.coerce.number().int().nonnegative().default(1),
  featured: z.boolean().default(false),
})

export type ProductInput = z.infer<typeof productSchema>
