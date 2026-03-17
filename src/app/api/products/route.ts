import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
<<<<<<< HEAD
=======
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { productSchema } from "@/validators/product.schema"
import { ProductService } from "@/services/product.service"
>>>>>>> 0e6df8f0532885c556a4d7b722796d33e8a8225d

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

<<<<<<< HEAD
  // TypeScript will infer the type automatically
  const productsWithRating = products.map((product: { reviews: any[] }) => ({
    ...product,
    averageRating: product.reviews.length > 0
      ? product.reviews.reduce((acc: number, r: { rating: number }) => acc + r.rating, 0) / product.reviews.length
      : 0,
    reviewCount: product.reviews.length
  }))

  return NextResponse.json(productsWithRating)
=======
    const productsWithRating = ProductService.formatProductsWithRating(products as any)

    return NextResponse.json(productsWithRating)
  } catch (error: any) {
    console.error("Products Fetch Error:", error)
    return NextResponse.json({ 
      error: "Failed to fetch products", 
      details: error.message || "Unknown error"
    }, { status: 500 })
  }
}


export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Access denied. Admin only." }, { status: 403 })
    }

    const body = await request.json()
    const validation = productSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json({ error: "Invalid data", details: validation.error.format() }, { status: 400 })
    }

    const product = await prisma.product.create({
      data: validation.data
    })
    
    return NextResponse.json(product, { status: 201 })
  } catch (error: any) {
    console.error("Product Creation Error:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
>>>>>>> 0e6df8f0532885c556a4d7b722796d33e8a8225d
}