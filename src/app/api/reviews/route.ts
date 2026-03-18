import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { z } from "zod"

const reviewSchema = z.object({
  productId: z.string().min(1),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { productId, rating, comment } = reviewSchema.parse(body)

    // Check if user has already reviewed this product
    const existingReview = await prisma.review.findFirst({
      where: {
        productId,
        userId: session.user.id
      }
    })

    if (existingReview) {
      return NextResponse.json({ error: "You have already reviewed this product" }, { status: 400 })
    }

    const review = await prisma.review.create({
      data: {
        rating,
        comment,
        productId,
        userId: session.user.id
      }
    })

    return NextResponse.json(review, { status: 201 })
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    console.error("Review Creation Error:", error)
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 })
  }
}
