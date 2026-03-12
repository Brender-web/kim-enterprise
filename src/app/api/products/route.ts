import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

// Define the type for product with reviews
type ProductWithReviews = Prisma.ProductGetPayload<{
  include: {
    reviews: {
      select: { rating: true }
    }
  }
}>

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

  // Calculate average rating with explicit type
  const productsWithRating = products.map((product: ProductWithReviews) => ({
    ...product,
    averageRating: product.reviews.length > 0
      ? product.reviews.reduce((acc: any, r: { rating: any }) => acc + r.rating, 0) / product.reviews.length
      : 0,
    reviewCount: product.reviews.length
  }))

  return NextResponse.json(productsWithRating)
}

export async function POST(request: Request) {
  const body = await request.json()
  
  const product = await prisma.product.create({
    data: body
  })
  
  return NextResponse.json(product, { status: 201 })
}