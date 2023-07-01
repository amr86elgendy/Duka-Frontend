import {
  createContext,
  useContext,
  useReducer,
  ReactElement,
  useMemo,
} from 'react';

type TProductToView = {
  name: string;
  image: string;
  price: number;
  _id: string;
  description: string;
  colors: { _id: string; name: string }[];
  size: string;
  // priceAfterDiscount;
  averageRating: number;
  numReviews: number;
};

export type StateType = {
  opened: boolean;
  product: TProductToView | null;
};

const initState: StateType = {
  opened: false,
  product: null,
};

export type QuickViewActionType = 'SET_VIEW' | 'REMOVE_VIEW';

type ReducerAction = {
  type: QuickViewActionType;
  payload?: any;
};

const reducer = (
  state: StateType,
  { type, payload }: ReducerAction
): StateType => {
  switch (type) {
    case 'SET_VIEW':
      return {
        ...state,
        opened: true,
        product: payload,
      };
    case 'REMOVE_VIEW':
      return {
        ...state,
        opened: false,
      };
    default:
      throw new Error(`there is no type called ${type}`);
  }
};

interface IQuickViewContext extends StateType {
  dispatch: (type: QuickViewActionType, payload?: any) => void;
}

const QuickViewContext = createContext<IQuickViewContext>({
  ...initState,
  dispatch: () => {},
});

export function QuickViewProvider({
  children,
}: {
  children?: ReactElement | ReactElement[] | undefined;
}): ReactElement {
  const [state, defaultDispatch] = useReducer(reducer, initState);

  const dispatch = (type: QuickViewActionType, payload?: any) =>
    defaultDispatch({ type, payload });
  const value = useMemo(() => ({ ...state, dispatch }), [state]);
  console.log('quick view context run');

  return (
    <QuickViewContext.Provider value={value}>
      {children}
    </QuickViewContext.Provider>
  );
}

export const useQuickViewContext = () => {
  return useContext(QuickViewContext);
};
