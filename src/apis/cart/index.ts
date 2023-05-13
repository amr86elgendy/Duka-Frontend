import {
  QueryFunctionContext,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { axiosPrivate } from '../axios';
import { useAuthContext } from '@/context/auth';
import { TCart, useCartContext } from '@/context/cart';

// ######################### Get Cart #########################
async function getCart(): Promise<{ cart: TCart }> {
  const { data } = await axiosPrivate({
    url: '/carts',
    method: 'GET',
  });
  return data;
}

// eslint-disable-next-line import/prefer-default-export
export const useGetCart = () => {
  const { isAuthenticated } = useAuthContext();
  const { dispatch } = useCartContext();
  return useQuery({
    queryKey: ['get-cart'],
    queryFn: getCart,
    enabled: isAuthenticated,
    select: (data) => data.cart,
    onSuccess: (data) => dispatch('SET_CART', data),
  });
};
