import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { orderId, paypalOrderId } = await request.json()

    if (!orderId || !paypalOrderId) {
      return NextResponse.json({ error: "Order IDs are required" }, { status: 400 })
    }

    // In a real scenario, you would call PayPal API to capture the payment here:
    // const captureResponse = await axios.post(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${paypalOrderId}/capture`, ...)
    
    // Assuming capture is successful for this implementation:
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: "COMPLETED",
        status: "PROCESSING"
      }
    })

    return NextResponse.json({ 
      message: "Payment captured successfully", 
      order: updatedOrder 
    })
  } catch (error: any) {
    console.error("PayPal Capture Error:", error)
    return NextResponse.json({ error: "Failed to capture PayPal payment" }, { status: 500 })
  }
}
