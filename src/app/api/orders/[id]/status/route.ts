import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "SELLER")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const { id } = await params
    const { status } = await request.json()

    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 })
    }

    const order = await prisma.order.update({
      where: { id },
      data: { status }
    })

    return NextResponse.json(order)
  } catch (error: any) {
    console.error("Order Status Update Error:", error)
    return NextResponse.json({ error: "Failed to update order status" }, { status: 500 })
  }
}
