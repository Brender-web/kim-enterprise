import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { ProductService } from "@/services/product.service"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        reviews: {
          select: { rating: true }
        }
      }
    })

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const formattedProduct = ProductService.formatProductWithRating(product as any)

    return NextResponse.json(formattedProduct)
  } catch (error: any) {
    console.error("Single Product Fetch Error:", error)
    return NextResponse.json({ 
      error: "Failed to fetch product", 
      details: error.message || "Unknown error"
    }, { status: 500 })
  }
}
