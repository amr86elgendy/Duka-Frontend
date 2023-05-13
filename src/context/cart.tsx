import {
  createContext,
  useContext,
  useReducer,
  ReactElement,
  useMemo,
} from 'react';

export type TCart = {
  _id: string;
  user: string;
  items: [
    {
      product: {
        _id: string;
        name: string;
        price: number;
      };
      selectedColor: {
        _id: string;
        name: string;
      };
      selectedSize: string;
      amount: number;
      totalProductPrice: number;
      _id: string;
    }
  ];
  totalItems: number;
  totalPrice: number;
  shipping_fee: number;
};

type StateType = {
  cart: TCart | null;
};

const initState: StateType = {
  cart: null,
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
      return {
        ...state,
        cart: null,
      };
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

  const dispatch = (type: CartActionType, payload?: any) =>
    defaultDispatch({ type, payload });
  const value = useMemo(() => ({ ...state, dispatch }), [state]);

  console.log('cart context run');

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCartContext = () => {
  return useContext(CartContext);
};
