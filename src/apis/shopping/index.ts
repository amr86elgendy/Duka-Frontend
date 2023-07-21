import {
  QueryFunctionContext,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import qs from 'query-string';
import axiosDefault from '../axios';
import { TFilterState } from '@/context/filter';

export type TProduct<T> = {
  _id: string;
  averageRating: number;
  brand: T;
  category: T;
  subCategory: T;
  colors: T[];
  createdAt: string;
  description: string;
  featured: boolean;
  freeShipping: boolean;
  images: string[];
  name: string;
  numReviews: number;
  price: number;
  priceAfterDiscount: number;
  quantity: number;
  sizes: string[];
  slug: string;
  sold: number;
  updatedAt: string;
  user: string;
};

// ######################### Get All Products #########################
type TGetProductsReturn = {
  currentPage: number;
  lastPage: number;
  pageCount: number;
  products: TProduct<{ _id: string; name: string }>[];
  totalCount: number;
};

type TGetProductsQueryKey = {
  filters?: TFilterState;
  queries?: {
    [key: string]: string | number;
  };
};
const getProducts = async ({
  pageParam = 1,
  queryKey,
}: QueryFunctionContext<
  [string, TGetProductsQueryKey]
>): Promise<TGetProductsReturn> => {
  let filters = {} as TFilterState;

  // console.log(queryKey[1].filters);
  // eslint-disable-next-line no-prototype-builtins
  if ('filters' in queryKey[1]) {
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
    keepPreviousData: true,
  });
};
// ######################### Get Single Product #########################

async function getProduct(
  productId: string
): Promise<{ product: TProduct<{ _id: string; name: string }> }> {
  const { data } = await axiosDefault({
    url: `/products/${productId}`,
    method: 'GET',
  });
  return data;
}

export const useGetSingleProduct = (productId: string) => {
  return useQuery({
    queryKey: ['get-single-product', productId],
    queryFn: () => getProduct(productId),
    select: (data) => data.product,
    keepPreviousData: true,
  });
};

// ######################### Get Similar Products #########################

async function getSimilarProducts({
  productId,
  ...rest
}: Record<string, string | number>): Promise<{ products: TProduct<string>[] }> {
  const queryStr = qs.stringify(rest, {
    skipNull: true,
  });

  const { data } = await axiosDefault({
    url: `/products/${productId}/similar?${queryStr}`,
    method: 'GET',
  });
  return data;
}

export const useGetSimilarProducts = (
  props: Record<string, string | number>
) => {
  return useQuery({
    queryKey: ['get-similar-products', props],
    queryFn: () => getSimilarProducts(props),
    select: (data) => data.products,
  });
};
