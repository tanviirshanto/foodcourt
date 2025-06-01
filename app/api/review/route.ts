import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Review from "@/models/reviewModel";
import "@/models/userModel";


export async function GET(request: NextRequest) {
  try {
    await connect();

    const reviews = await Review.find().populate("user", "name email role");

    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    console.error("GET /api/review error:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connect();

    const { user, rating, comment, name } = await request.json();

    if (!user || !rating || !comment || !name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be a number between 1 and 5" },
        { status: 400 }
      );
    }

    const newReview = await Review.create({ user, rating, comment, name });

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error("POST /api/review error:", error);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}
