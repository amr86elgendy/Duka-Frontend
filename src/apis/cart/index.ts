import {
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useAuthContext } from '@/context/auth';
import { TCart, useCartContext } from '@/context/cart';

// ######################### Get Cart #########################
export function useGetCart() {
  const axiosPrivate = useAxiosPrivate();
  const { isAuthenticated } = useAuthContext();
  const { dispatch } = useCartContext();
  return useQuery({
    queryKey: ['get-cart'],
    queryFn: async (): Promise<{ cart: TCart }> => {
      const { data } = await axiosPrivate({
        url: '/carts',
        method: 'GET',
      });
      return data;
    },
    enabled: isAuthenticated,
    select: (data) => data.cart,
    onSuccess: (data) => dispatch('SET_CART', data),
  });
}

// ######################### Add To Cart #########################
export function useAddToCart(cartData: {
  amount: number;
  color: string;
  productId: string;
  size: string;
}) {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<{ cart: TCart }> => {
      const { data } = await axiosPrivate({
        url: `/carts`,
        method: 'POST',
        data: cartData,
      });
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['get-cart'] }),
  });
}
// ######################### Increase Item By One #########################
export function useIncreaseItemByOne(itemId: string) {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<{ cart: TCart }> => {
      const { data } = await axiosPrivate({
        url: `/carts/${itemId}/increase-one`,
        method: 'POST',
      });
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['get-cart'] }),
  });
}

// ######################### Reduce Item By One #########################
export function useReduceItemByOne(itemId: string) {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<{ cart: TCart }> => {
      const { data } = await axiosPrivate({
        url: `/carts/${itemId}/reduce-one`,
        method: 'POST',
      });
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['get-cart'] }),
  });
}

// ######################### Reduce Item By One #########################
export function useDeleteCartItem(itemId: string) {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<{ cart: TCart }> => {
      const { data } = await axiosPrivate({
        url: `/carts/${itemId}`,
        method: 'DELETE',
      });
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['get-cart'] }),
  });
}

// ######################### Reduce Item By One #########################
export function useDeleteCart() {
  const axiosPrivate = useAxiosPrivate();
  const { dispatch } = useCartContext();

  return useMutation({
    mutationFn: async (): Promise<{ cart: TCart }> => {
      const { data } = await axiosPrivate({
        url: `/carts`,
        method: 'DELETE',
      });
      return data;
    },
    onSuccess: () => dispatch('REMOVE_CART'),
  });
}
