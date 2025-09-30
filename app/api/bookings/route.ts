import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

function generatePin() {
  return (Math.floor(100000 + Math.random() * 900000)).toString()
}

export async function POST(req: Request) {
  const body = await req.json()
  const { email, startAt, endAt } = body
  const booking = await prisma.booking.create({
    data: { email, startAt: new Date(startAt), endAt: new Date(endAt), pin: generatePin() }
  })
  return NextResponse.json(booking)
}

export async function GET() {
  const bookings = await prisma.booking.findMany()
  return NextResponse.json(bookings)
}
