import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log("M-Pesa Callback Received:", JSON.stringify(body, null, 2))

    // Check if the callback structure is valid
    if (!body.Body || !body.Body.stkCallback) {
      return NextResponse.json({ ResultCode: 1, ResultDesc: "Invalid callback data" }, { status: 400 })
    }

    const { ResultCode, ResultDesc, CheckoutRequestID, CallbackMetadata } = body.Body.stkCallback

    // ResultCode 0 means success
    if (ResultCode === 0) {
      // Extract metadata (Amount, MpesaReceiptNumber, TransactionDate, etc.)
      const metadata = CallbackMetadata.Item.reduce((acc: any, item: any) => {
        acc[item.Name] = item.Value
        return acc
      }, {})

      console.log("Payment Successful for CheckoutRequestID:", CheckoutRequestID, metadata)

      // Find the order associated with this CheckoutRequestID
      // Note: We should ideally have stored CheckoutRequestID when initiating the STK push
      // For now, we'll assume we have a way to match it or we're looking for pending orders
      // In a real scenario, you'd find the order by CheckoutRequestID which should be indexed
      
      const order = await prisma.order.findFirst({
        where: { 
          // This assumes we stored CheckoutRequestID in the order or a transaction log
          // Since we haven't implemented that part yet, this is a placeholder for the logic
          paymentStatus: "PENDING",
          // ... other matching logic
        }
      })

      if (order) {
        await prisma.order.update({
          where: { id: order.id },
          data: { 
            paymentStatus: "COMPLETED",
            status: "PROCESSING"
          }
        })
      }
    } else {
      console.log("Payment Failed for CheckoutRequestID:", CheckoutRequestID, ResultDesc)
      // Update order status to FAILED if necessary
    }

    return NextResponse.json({ ResultCode: 0, ResultDesc: "Success" })
  } catch (error: any) {
    console.error("M-Pesa Callback Error:", error)
    return NextResponse.json({ ResultCode: 1, ResultDesc: "Internal server error" }, { status: 500 })
  }
}
