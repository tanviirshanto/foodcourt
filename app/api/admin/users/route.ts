import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import UserModel from "@/models/userModel";
import { User } from "@/types/user"; // <-- Use the User interface for optional type annotation

export async function GET() {
    await connect();
  
    try {
      const users = await UserModel.find().lean();
  
      const usersWithStringId = users.map((user) => ({
        ...user,
        _id: user._id.toString(), // <- Fix the ObjectId problem
      }));
      console.log("Fetched users:", usersWithStringId);
  
      return NextResponse.json({ users: usersWithStringId });
    } catch (error) {
      return NextResponse.json(
        { message: "Failed to fetch users" },
        { status: 500 }
      );
    }
  }
  
