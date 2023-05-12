import {
  QueryFunctionContext,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import qs from 'query-string';
import axiosDefault from '../../axios';

type TReview = {
  comment: string;
  createdAt: string;
  product: {
    _id: string;
    name: string;
    price: number;
  };
  rating: number;
  updatedAt: string;
  user: { _id: string; name: string };
  _id: string;
};

type TGetProductReviewReturn = {
  currentPage: number;
  lastPage: number;
  pageCount: number;
  reviews: TReview[];
  totalCount: number;
};

// ######################### Get Product Review #########################
async function getProductReviews({
  pageParam = 1,
  queryKey,
}: QueryFunctionContext<
  [string, Record<string, string>]
>): Promise<TGetProductReviewReturn> {
  const queryStr = qs.stringify(queryKey[1], {
    arrayFormat: 'bracket',
    skipEmptyString: true,
    skipNull: true,
  });

  const { data } = await axiosDefault({
    url: `/reviews?page=${pageParam}&${queryStr}`,
    method: 'GET',
  });
  return data;
}

// eslint-disable-next-line import/prefer-default-export
export const useGetProductReviews = (props: Record<string, string>) => {
  return useInfiniteQuery({
    queryKey: ['get-product-reviews', props],
    queryFn: getProductReviews,
    getNextPageParam: ({ currentPage, lastPage }) => {
      if (currentPage < lastPage) {
        return currentPage + 1;
      }
      return undefined;
    },
  });
};
