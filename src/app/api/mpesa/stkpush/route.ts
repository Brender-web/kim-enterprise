import { NextResponse } from "next/server"
import axios from "axios"
import { env } from "@/lib/env"

const MPESA_BASE_URL = env.MPESA_ENV === "production"
  ? "https://api.safaricom.co.ke"
  : "https://sandbox.safaricom.co.ke"

export async function POST(request: Request) {
  try {
    const { phone, amount, orderId } = await request.json()
    
    if (!phone || !amount || !orderId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const token = await getMpesaToken()
    
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3)
    const password = Buffer.from(
      `${env.MPESA_SHORTCODE}${env.MPESA_PASSKEY}${timestamp}`
    ).toString('base64')

    const response = await axios.post(
      `${MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest`,
      {
        BusinessShortCode: env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phone,
        PartyB: env.MPESA_SHORTCODE,
        PhoneNumber: phone,
        CallBackURL: `${env.NEXT_PUBLIC_APP_URL}/api/mpesa/callback`,
        AccountReference: `KIM-${orderId}`,
        TransactionDesc: "Payment for goods"
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    return NextResponse.json(response.data)
  } catch (error: any) {
    console.error("M-Pesa STK Push Error:", error.response?.data || error.message)
    return NextResponse.json(
      { error: "Payment initiation failed", details: error.response?.data?.errorMessage || error.message },
      { status: 500 }
    )
  }
}

async function getMpesaToken() {
  const auth = Buffer.from(
    `${env.MPESA_CONSUMER_KEY}:${env.MPESA_CONSUMER_SECRET}`
  ).toString('base64')

  const response = await axios.get(
    `${MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`,
    { headers: { Authorization: `Basic ${auth}` } }
  )

  return response.data.access_token
}