export default function formatRating(rating: number) {
  return rating === 0 ? '0' : rating.toFixed(1);
}
