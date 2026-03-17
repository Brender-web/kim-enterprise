import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const featured = searchParams.get("featured")

  const products = await prisma.product.findMany({
    where: {
      ...(category && { category: category as any }),
      ...(featured === "true" && { featured: true }),
    },
    include: {
      reviews: {
        select: { rating: true }
      }
    }
  })

  // TypeScript will infer the type automatically
  const productsWithRating = products.map((product: { reviews: any[] }) => ({
    ...product,
    averageRating: product.reviews.length > 0
      ? product.reviews.reduce((acc: number, r: { rating: number }) => acc + r.rating, 0) / product.reviews.length
      : 0,
    reviewCount: product.reviews.length
  }))

  return NextResponse.json(productsWithRating)
}