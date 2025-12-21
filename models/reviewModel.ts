import mongoose, { Schema, model, models, type Model } from "mongoose";
import type { ReviewDocument } from "@/types/review";
import User from "@/models/userModel"; 

const reviewSchema = new Schema<ReviewDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Review: Model<ReviewDocument> =
  models.Review || model<ReviewDocument>("Review", reviewSchema);

export default Review;
