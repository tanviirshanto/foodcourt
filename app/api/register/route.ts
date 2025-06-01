import bcrypt from "bcryptjs";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
  try {
    await connect();

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return new NextResponse("Email already exists", { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({ message: "User registered successfully" });
  } catch (err: any) {
    console.error("REGISTER ERROR:", err); // 👈 Add this for debugging
    return new NextResponse("Server error", { status: 500 });
  }
}

