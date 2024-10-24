import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verify } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function GET() {
  const token = cookies().get("admin_token")?.value

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  try {
    verify(token, JWT_SECRET)
    return NextResponse.json({ authenticated: true })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}