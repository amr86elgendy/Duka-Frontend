import { useParams } from 'react-router-dom';
import { useGetProductReviews } from '@/apis/shopping';
import ReviewComment from '../comment';

export default function ReviewList() {
  const { productId } = useParams();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useGetProductReviews({ product: productId });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col gap-6">
      {data?.pages
        .flatMap((page) => page.reviews)
        .map((review) => (
          <ReviewComment key={review._id} {...review} />
        ))}
    </div>
  );
}
