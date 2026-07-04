import { Star, ShieldCheck } from "lucide-react";
import type { Review } from "../../lib/types/medicine";

interface ReviewListProps {
  reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  if (!reviews || reviews.length === 0) {
    return <p className="text-muted-foreground text-sm">No reviews yet.</p>;
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="border-b border-border/50 pb-6 last:border-0 last:pb-0">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold">{review.authorName}</span>
                {review.verifiedPurchase && (
                  <span className="flex items-center text-xs text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3 h-3 mr-1" /> Verified
                  </span>
                )}
              </div>
              <div className="text-xs text-muted-foreground mt-1">{new Date(review.date).toLocaleDateString()}</div>
            </div>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-muted fill-muted"}`} 
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-foreground/80">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
