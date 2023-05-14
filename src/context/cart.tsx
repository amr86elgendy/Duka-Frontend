import {
  createContext,
  useContext,
  useReducer,
  ReactElement,
  useMemo,
  useEffect,
} from 'react';
import { useGetCart } from '@/apis/cart';

type TCartItem = {
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

type StateType = {
  cart: TCart;
};

const initState: StateType = {
  cart: {
    _id: '',
    user: '',
    items: [],
    totalItems: 0,
    totalPrice: 0,
    shippingFee: 0,
  },
};

export type CartActionType = 'SET_CART' | 'REMOVE_CART';

type ReducerAction = {
  type: CartActionType;
  payload?: any;
};

const reducer = (
  state: StateType,
  { type, payload }: ReducerAction
): StateType => {
  switch (type) {
    case 'SET_CART':
      return {
        ...state,
        cart: payload.cart,
      };
    case 'REMOVE_CART':
      return initState;
    default:
      throw new Error(`there is no type called ${type}`);
  }
};

interface ICartContext extends StateType {
  dispatch: (type: CartActionType, payload?: any) => void;
}

const CartContext = createContext<ICartContext>({
  ...initState,
  dispatch: () => {},
});

export function CartProvider({
  children,
}: {
  children?: ReactElement | ReactElement[] | undefined;
}): ReactElement {
  const [state, defaultDispatch] = useReducer(reducer, initState);
  const { data } = useGetCart();

  const dispatch = (type: CartActionType, payload?: any) =>
    defaultDispatch({ type, payload });
  const value = useMemo(() => ({ ...state, dispatch }), [state]);
  console.log('cart context run');
  useEffect(() => {
    if (data) {
      dispatch('SET_CART', { cart: data });
    }
  }, [data]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCartContext = () => {
  return useContext(CartContext);
};
