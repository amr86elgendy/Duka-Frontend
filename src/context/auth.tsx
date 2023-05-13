import {
  createContext,
  useContext,
  useReducer,
  ReactElement,
  useMemo,
} from 'react';
import jwtDecode from 'jwt-decode';

interface IUser {
  name: string;
  email: string;
  role: 'admin' | 'user';
  _id: string;
}

type StateType = {
  status: 'logged_out' | 'logged_in' | 'unknown';
  isAuthenticated: boolean;
  user: IUser | null;
  accessToken: string | null;
};

const initState: StateType = {
  status: 'unknown',
  isAuthenticated: false,
  user: null,
  accessToken: null,
};

export type AuthActionType =
  | 'SET_USER'
  | 'REFRESH_ACCESS_TOKEN'
  | 'LOGOUT_USER';

type ReducerAction = {
  type: AuthActionType;
  payload?: any;
};

const reducer = (
  state: StateType,
  { type, payload }: ReducerAction
): StateType => {
  switch (type) {
    case 'SET_USER':
      return {
        ...state,
        status: 'logged_in',
        isAuthenticated: true,
        user: payload.user,
        accessToken: payload.accessToken,
      };
    case 'REFRESH_ACCESS_TOKEN':
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { name, email, role, _id } = jwtDecode<IUser>(payload.accessToken);
      return {
        ...state,
        status: 'logged_in',
        isAuthenticated: true,
        user: { name, email, role, _id },
        accessToken: payload.accessToken,
      };
    case 'LOGOUT_USER':
      return {
        ...state,
        status: 'logged_out',
        isAuthenticated: false,
        user: null,
        accessToken: null,
      };
    default:
      throw new Error(`there is no type called ${type}`);
  }
};

interface IAuthContext extends StateType {
  dispatch: (type: AuthActionType, payload?: any) => void;
}

const AuthContext = createContext<IAuthContext>({
  ...initState,
  dispatch: () => {},
});

export function AuthProvider({
  children,
}: {
  children?: ReactElement | ReactElement[] | undefined;
}): ReactElement {
  const [state, defaultDispatch] = useReducer(reducer, initState);

  const dispatch = (type: AuthActionType, payload?: any) =>
    defaultDispatch({ type, payload });
  const value = useMemo(() => ({ ...state, dispatch }), [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => {
  return useContext(AuthContext);
};
