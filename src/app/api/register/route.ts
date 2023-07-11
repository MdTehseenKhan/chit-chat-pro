import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

import prisma from "@/lib/prismadb"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {name, email, password} = body

    if (!name || !email || !password) return new NextResponse("Missing Info", { status: 400 })

    const userExists = await prisma.user.findUnique({ where: { email } })
    if (userExists) return new NextResponse("Email Already Exists", { status: 422 })

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword
      }
    })

    return NextResponse.json(user)
    // 
  } catch(e) {
    return new NextResponse("Internal Server Error", { status: 500 })
  }

}