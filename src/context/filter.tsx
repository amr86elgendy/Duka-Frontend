import {
  createContext,
  useContext,
  useReducer,
  ReactElement,
  useMemo,
} from 'react';

export type TFilterState = {
  sort: string;
  category: string[];
  brand: string[];
};

const initState: TFilterState = {
  sort: '',
  category: [],
  brand: [],
};

export type TFilterAction =
  | 'SET_FILTER'
  | 'REMOVE_FILTER'
  | 'CLEAR_ALL_FILTERS';

type ReducerAction = {
  type: TFilterAction;
  payload?: { name: keyof TFilterState; value: string | string[] };
};

const reducer = (
  state: TFilterState,
  { type, payload }: ReducerAction
): TFilterState => {
  switch (type) {
    case 'SET_FILTER': {
      if (payload) {
        const { name, value } = payload;
        return {
          ...state,
          [name]: value,
        };
      }
      return state;
    }
    case 'REMOVE_FILTER': {
      if (payload) {
        const { name, value } = payload;
        if (name === 'sort') {
          return {
            ...state,
            sort: '',
          };
        }
        return {
          ...state,
          [name]: state[name].filter((el) => el.split(',')[1] !== value),
        };
      }
      return state;
    }
    case 'CLEAR_ALL_FILTERS':
      return {
        ...initState,
      };
    default:
      throw new Error(`there is no type called ${type}`);
  }
};

type TFilterContext = {
  filters: TFilterState;
  dispatch: (
    type: TFilterAction,
    payload?: { name: keyof TFilterState; value: string | string[] }
  ) => void;
};

const FilterContext = createContext<TFilterContext>({
  filters: initState,
  dispatch: () => {},
});

export function FilterProvider({
  children,
}: {
  children?: ReactElement | ReactElement[] | undefined;
}): ReactElement {
  const [state, defaultDispatch] = useReducer(reducer, initState);

  const dispatch = (
    type: TFilterAction,
    payload?: { name: keyof TFilterState; value: string | string[] }
  ) => defaultDispatch({ type, payload });
  const value = useMemo(() => ({ filters: state, dispatch }), [state]);

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

export const useFilterContext = () => {
  return useContext(FilterContext);
};
