export default function RatingStars({ rating, reviewCount, size = "md" }) {
  const sizeClass = size === "sm" ? "text-sm" : "text-base";
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className={`flex items-center gap-1 ${sizeClass}`}>
      <div className="flex gap-0.5" dir="ltr">
        {stars.map((star) => (
          <span
            key={star}
            className={
              star <= Math.round(rating) ? "text-amber-400" : "text-gray-200"
            }
          >
            ★
          </span>
        ))}
      </div>
      <span className="text-gray-700 font-bold">{rating.toFixed(1)}</span>
      {reviewCount !== undefined && (
        <span className="text-gray-400 text-sm">({reviewCount})</span>
      )}
    </div>
  );
}
