"use client";

import { User } from "@/types";
import { ReviewDocument } from "@/types/review";
import { Star } from "lucide-react";
import { Types } from "mongoose";
import { motion } from "framer-motion";

const getUserName = (user: Types.ObjectId | User): string =>
  typeof user === "object" && "name" in user ? user.name : "Unknown";

export default function ReviewList({ reviews }: { reviews: ReviewDocument[] }) {
  return (
    <div className="mt-14 lg:my-20 flex flex-col justify-center z-0">
      <h1 className="text-center font-extrabold md:text-5xl text-3xl text-black">
        What People Are Saying
      </h1>

      <div className="flex flex-wrap justify-center gap-6 my-14 px-2">
        {reviews.slice(0, 6).map((review) => (
          <motion.div
            key={String(review._id)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:w-96 sm:w-80 md:w-72 lg:mx-5 mx-3 shadow-2xl rounded-xl bg-white p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold text-lg text-black">
                {getUserName(review.user)}
              </p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < review.rating ? "#facc15" : "none"}
                    stroke="#facc15"
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-700">{review.comment}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
