import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import qs from 'query-string';
import axiosDefault from '../axios';

// ######################### Get All Products #########################
const getProducts = async ({ pageParam = 1, queryKey }: any) => {
  let filters = {};

  // console.log(Object.fromEntries(queryKey[1].filters));

  if (Object.prototype.hasOwnProperty.call(queryKey[1], 'filters')) {
    for (const key in queryKey[1].filters) {
      if (key === 'sort') {
        filters[key] = queryKey[1].filters[key].split(',')[0];
      } else {
        filters[key] = queryKey[1].filters[key].map(
          (f: string) => f.split(',')[0]
        );
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

export const useGetProducts = (props: any) => {
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

async function getProduct(productId: string) {
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
  });
};

// ######################### Get Similar Products #########################

async function getSimilarProducts({ productId, ...rest }: Record<string, any>) {
  const queryStr = qs.stringify(rest, {
    skipNull: true,
  });

  const { data } = await axiosDefault({
    url: `/products/${productId}/similar?${queryStr}`,
    method: 'GET',
  });
  return data;
}

export const useGetSimilarProducts = (props: Record<string, any>) => {
  return useQuery({
    queryKey: ['get-similar-products', props],
    queryFn: () => getSimilarProducts(props),
    select: (data) => data.products,
  });
};

// ######################### Get Product Review #########################

async function getProductReviews({ pageParam = 1, queryKey }: any) {
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

export const useGetProductReviews = (props: any) => {
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