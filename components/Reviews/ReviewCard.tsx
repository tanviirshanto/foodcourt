"use client";

import { motion } from "framer-motion";
import { ReviewDocument } from "@/types/review";
import ReviewStars from "./ReviewStars";
import { getUserName } from "@/utils/reviewUtils";


export default function ReviewCard({ review }: { review: ReviewDocument }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="lg:w-96 sm:w-80 md:w-72 lg:mx-5 mx-3 shadow-2xl rounded-xl bg-white p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <p className="font-semibold text-lg text-black">
          {getUserName(review.user)}
        </p>
        <ReviewStars rating={review.rating} />
      </div>

      <p className="text-sm text-gray-700">{review.comment}</p>
    </motion.div>
  );
}
