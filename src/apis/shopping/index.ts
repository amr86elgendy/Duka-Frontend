import {
  QueryFunctionContext,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import qs from 'query-string';
import axiosDefault from '../axios';
import { TFilterState } from '@/context/filter';

type TProduct<T> = {
  _id: string;
  averageRating: number;
  brand: T;
  category: T;
  subCategory: T;
  colors: string[];
  createdAt: string;
  description: string;
  featured: boolean;
  freeShipping: boolean;
  images: string[];
  name: string;
  numReviews: number;
  price: number;
  quantity: number;
  sizes: string[];
  slug: string;
  sold: number;
  updatedAt: string;
  user: string;
};

// ######################### Get All Products #########################
type TGetProductsQueryKey = {
  filters?: TFilterState;
  queries?: {
    [key: string]: string | number;
  };
};
const getProducts = async ({
  pageParam = 1,
  queryKey,
}: QueryFunctionContext<[string, TGetProductsQueryKey]>) => {
  let filters: Partial<TFilterState> = {};

  // console.log(queryKey[1].filters);
  if (Object.prototype.hasOwnProperty.call(queryKey[1], 'filters')) {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in queryKey[1].filters) {
      if (key === 'sort') {
        // eslint-disable-next-line prefer-destructuring
        filters[key] = queryKey[1].filters[key].split(',')[0];
      } else {
        filters[key as keyof Omit<TFilterState, 'sort'>] = queryKey[1].filters[
          key as keyof Omit<TFilterState, 'sort'>
        ].map((f: string) => f.split(',')[0]);
      }
    }
  }
  filters = { ...filters, ...queryKey[1].queries };

  const queryStr = qs.stringify(filters, {
    arrayFormat: 'bracket',
    skipEmptyString: true,
    skipNull: true,
  });

  const { data } = await axiosDefault({
    url: `/products?page=${pageParam}&${queryStr}`,
    method: 'GET',
  });
  return data;
};

export const useGetProducts = (props: TGetProductsQueryKey) => {
  return useInfiniteQuery({
    queryKey: ['get-products', props],
    queryFn: getProducts,
    getNextPageParam: ({ currentPage, lastPage }) => {
      if (currentPage < lastPage) {
        return currentPage + 1;
      }
      return undefined;
    },
  });
};
// ######################### Get Single Product #########################

async function getProduct(
  productId: string
): Promise<TProduct<{ _id: string; name: string }>> {
  const { data } = await axiosDefault({
    url: `/products/${productId}`,
    method: 'GET',
  });
  return data.product;
}

export const useGetSingleProduct = (productId: string) => {
  return useQuery({
    queryKey: ['get-single-product', productId],
    queryFn: () => getProduct(productId),
  });
};

// ######################### Get Similar Products #########################

async function getSimilarProducts({
  productId,
  ...rest
}: Record<string, string | number>): Promise<TProduct<string>[]> {
  const queryStr = qs.stringify(rest, {
    skipNull: true,
  });

  const { data } = await axiosDefault({
    url: `/products/${productId}/similar?${queryStr}`,
    method: 'GET',
  });
  return data.products;
}

export const useGetSimilarProducts = (
  props: Record<string, string | number>
) => {
  return useQuery({
    queryKey: ['get-similar-products', props],
    queryFn: () => getSimilarProducts(props),
  });
};

// ######################### Get Product Review #########################

async function getProductReviews({
  pageParam = 1,
  queryKey,
}: QueryFunctionContext<[string, Record<string, string>]>) {
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
