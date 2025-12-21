import { Star } from "lucide-react";

export default function ReviewStars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          fill={i < rating ? "#facc15" : "none"}
          stroke="#facc15"
        />
      ))}
    </div>
  );
}
