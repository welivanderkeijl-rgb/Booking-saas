import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { pin } = await req.json()
  const booking = await prisma.booking.findFirst({ where: { pin } })
  if (!booking) return NextResponse.json({ error: "PIN niet gevonden" }, { status: 404 })

  await prisma.booking.update({ where: { id: booking.id }, data: { status: "IN_PROGRESS" } })
  return NextResponse.json({ ok: true, status: "IN_PROGRESS" })
}
