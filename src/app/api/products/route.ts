import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { productSchema } from "@/validators/product.schema"
import { ProductService } from "@/services/product.service"

export async function GET(request: Request) {
  try {
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

    const productsWithRating = ProductService.formatProductsWithRating(products)

    return NextResponse.json(productsWithRating)
  } catch (error: unknown) {
    console.error("Products Fetch Error:", error)
    const message = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ 
      error: "Failed to fetch products", 
      details: message
    }, { status: 500 })
  }
}


export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "SELLER")) {
      return NextResponse.json({ error: "Access denied. Admin or Seller only." }, { status: 403 })
    }

    const body = await request.json()
    const validation = productSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json({ error: "Invalid data", details: validation.error.format() }, { status: 400 })
    }

    const product = await prisma.product.create({
      data: {
        ...validation.data,
        sellerId: session.user.id
      }
    })
    
    return NextResponse.json(product, { status: 201 })
  } catch (error: any) {
    console.error("Product Creation Error:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}