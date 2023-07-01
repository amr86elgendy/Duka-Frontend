import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useAuthContext } from '@/context/auth';

export type TCartItem = {
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
  };
  selectedColor: {
    _id: string;
    name: string;
  };
  selectedSize: string;
  amount: number;
  totalProductPrice: number;
  _id: string;
};

export type TCart = {
  _id: string;
  user: string;
  items: TCartItem[];
  totalItems: number;
  totalPrice: number;
  shippingFee: number;
};

// ######################### Get Cart #########################
export function useGetCart() {
  const axiosPrivate = useAxiosPrivate();
  const { isAuthenticated } = useAuthContext();

  return useQuery({
    queryKey: ['get-cart'],
    queryFn: async (): Promise<{ cart: TCart }> => {
      const { data } = await axiosPrivate({
        url: '/carts',
        method: 'GET',
      });
      return data;
    },
    // initialData: {
    //   cart: {
    //     _id: '',
    //     user: '',
    //     items: [],
    //     totalItems: 0,
    //     totalPrice: 0,
    //     shippingFee: 0,
    //   },
    // },
    enabled: isAuthenticated,
    // staleTime: 60 * 60 * 1000,
    select: (data) => data.cart,
  });
}

// ######################### Add To Cart #########################
export function useAddToCart() {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (cartData: {
      amount: number;
      color: string;
      productId: string;
      size: string;
    }): Promise<{ cart: TCart }> => {
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
export function useIncreaseItemByOne() {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemId: string): Promise<{ cart: TCart }> => {
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
export function useReduceItemByOne() {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemId: string): Promise<{ cart: TCart }> => {
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
export function useDeleteCartItem() {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemId: string): Promise<{ cart: TCart }> => {
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<{ cart: TCart }> => {
      const { data } = await axiosPrivate({
        url: `/carts`,
        method: 'DELETE',
      });
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['get-cart'] }),
  });
}
