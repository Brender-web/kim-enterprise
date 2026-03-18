import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { PaymentService } from "@/services/payment.service"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { amount, currency } = await request.json()

    if (!amount) {
      return NextResponse.json({ error: "Amount is required" }, { status: 400 })
    }

    const order = await PaymentService.createPaypalOrder(amount, currency || "USD")

    return NextResponse.json(order)
  } catch (error: any) {
    console.error("PayPal Order Creation Error:", error)
    return NextResponse.json({ error: "Failed to create PayPal order" }, { status: 500 })
  }
}
