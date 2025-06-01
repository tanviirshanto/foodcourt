// app/api/user/getuser/[id]/route.ts
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  await connect();
  const { id } = params;

  try {
    const user = await User.findById(id).select("name email contact address imageUrl");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user", error);
    return NextResponse.json(
      { success: false, message: "Error fetching user" },
      { status: 500 }
    );
  }
}
