// Import necessary modules
import User from "@/models/userModel";
import { NextResponse } from "next/server";

// Define the route handler
export async function GET(request, { params }) {
  const { id } = params;

  try {
    // Find the user by ID
    const user = await User.findById({_id:id});

    // Check if the user exists
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // Return the user data
    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching user",
      },
      { status: 500 }
    );
  }
}

// Export the route handler
export default GET;
