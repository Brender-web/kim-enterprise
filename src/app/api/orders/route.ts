import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { PaymentService } from "@/services/payment.service"
import { z } from "zod"

const orderSchema = z.object({
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().min(1),
    price: z.number()
  })),
  total: z.number(),
  paymentMethod: z.enum(["MPESA", "PAYPAL"]),
  shippingAddress: z.any(),
  phoneNumber: z.string().optional(),
})

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      include: {
        items: {
          include: {
            product: {
              select: {
                name: true,
                images: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(orders)
  } catch (error: any) {
    console.error("Orders Fetch Error:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { items, total, paymentMethod, shippingAddress, phoneNumber } = orderSchema.parse(body)

    // 1. Create Order in DB
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        total,
        paymentMethod,
        shippingAddress,
        items: {
          create: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      }
    })

    // 2. Initiate Payment
    let paymentResponse = null
    if (paymentMethod === "MPESA") {
      if (!phoneNumber) throw new Error("Phone number required for M-Pesa")
      paymentResponse = await PaymentService.initiateMpesaStkPush(phoneNumber, total, order.id)
    } else {
      paymentResponse = await PaymentService.createPaypalOrder(total)
    }

    return NextResponse.json({ 
      message: "Order created successfully", 
      orderId: order.id,
      paymentResponse 
    }, { status: 201 })

  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    console.error("Order Creation Error:", error)
    return NextResponse.json({ error: error.message || "Failed to create order" }, { status: 500 })
  }
}
