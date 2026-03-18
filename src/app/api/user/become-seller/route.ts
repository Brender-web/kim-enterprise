import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Using "as any" to bypass potential Prisma Client type sync issues 
    // where the SELLER enum might not be reflected in the IDE/Compiler yet
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: { role: "SELLER" as any }
    })

    return NextResponse.json({ 
      message: "Successfully transitioned to Seller role",
      user: {
        id: user.id,
        role: user.role
      }
    })
  } catch (error: any) {
    console.error("Seller Transition Error:", error)
    return NextResponse.json({ error: "Failed to transition to seller" }, { status: 500 })
  }
}
