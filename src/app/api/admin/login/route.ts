import { NextResponse } from "next/server"
import { sign } from "jsonwebtoken"
import { cookies } from "next/headers"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: Request) {
  const body = await request.json()
  const { username, password } = body

  // Replace this with your actual authentication logic
  if (username === "admin" && password === "password") {
    const token = sign({ username }, JWT_SECRET, { expiresIn: "1h" })
    
    cookies().set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600, // 1 hour
      path: "/",
    })

    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ success: false }, { status: 401 })
}