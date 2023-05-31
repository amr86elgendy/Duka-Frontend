import { useParams } from 'react-router-dom';
import { useGetProductReviews } from '@/apis/shopping/reviews';
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
  } = useGetProductReviews({ product: productId! });
  console.log(data);

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
