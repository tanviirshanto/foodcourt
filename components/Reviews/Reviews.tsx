
import { ReviewDocument } from "@/types/review";
import ReviewCard from "./ReviewCard";
import SectionHeader from "../Common/SectionHeader";

export default function Reviews({ reviews }: { reviews: ReviewDocument[] }) {
  return (
    <div className="mt-14 lg:my-20 flex flex-col justify-center z-0">
      <SectionHeader text="What People Are Saying" />

      <div className="flex flex-wrap justify-center gap-6 my-14 px-2">
        {reviews.slice(0, 6).map((review) => (
          <ReviewCard key={String(review._id)} review={review} />
        ))}
      </div>
    </div>
  );
}
