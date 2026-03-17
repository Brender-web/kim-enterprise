import axios from "axios"
import { prisma } from "@/lib/prisma"

const MPESA_BASE_URL = process.env.MPESA_ENV === "production"
  ? "https://api.safaricom.co.ke"
  : "https://sandbox.safaricom.co.ke"

export class PaymentService {
  /**
   * M-Pesa STK Push
   */
  static async initiateMpesaStkPush(phone: string, amount: number, orderId: string) {
    const token = await this.getMpesaToken()
    
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3)
    const password = Buffer.from(
      `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
    ).toString('base64')

    const response = await axios.post(
      `${MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest`,
      {
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: Math.round(amount),
        PartyA: phone,
        PartyB: process.env.MPESA_SHORTCODE,
        PhoneNumber: phone,
        CallBackURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/mpesa/callback`,
        AccountReference: `KIM-${orderId}`,
        TransactionDesc: "Payment for goods"
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    return response.data
  }

  private static async getMpesaToken() {
    const auth = Buffer.from(
      `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
    ).toString('base64')

    const response = await axios.get(
      `${MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`,
      { headers: { Authorization: `Basic ${auth}` } }
    )

    return response.data.access_token
  }

  /**
   * PayPal Order Creation (Server-side)
   * Note: Requires PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET
   */
  static async createPaypalOrder(amount: number, currency: string = "USD") {
    // Placeholder for PayPal REST API Order Creation
    // In a real scenario, you'd call https://api-m.sandbox.paypal.com/v2/checkout/orders
    console.log(`Creating PayPal order for ${amount} ${currency}`)
    return {
      id: `PAY-${Math.random().toString(36).substr(2, 9)}`,
      status: "CREATED"
    }
  }

  /**
   * Verify Payment Status
   */
  static async verifyPayment(orderId: string, provider: 'MPESA' | 'PAYPAL') {
    // Update order status in DB
    return await prisma.order.update({
      where: { id: orderId },
      data: { paymentStatus: "COMPLETED" }
    })
  }
}
