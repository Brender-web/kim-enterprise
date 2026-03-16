import { z } from "zod"

export const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.union([z.number(), z.string(), z.any()]).transform((val) => Number(val)), 
  currency: z.string().default("KES"),
  images: z.array(z.string()).default([]),
  category: z.enum(["ELECTRONICS", "FASHION", "HOME", "BEAUTY", "SPORTS", "FOOD", "BOOKS", "AUTOMOTIVE"]),
  stock: z.number().int().nonnegative().default(0),
  featured: z.boolean().default(false),
})

export type ProductInput = z.infer<typeof productSchema>
