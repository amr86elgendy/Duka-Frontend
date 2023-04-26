import { createContext, useContext, useReducer, ReactElement } from 'react';
import jwtDecode from 'jwt-decode';

interface IUser {
  name: string;
  email: string;
  role: 'admin' | 'user';
}

type StateType = {
  isAuthenticated: boolean;
  user: IUser | null;
  accessToken: string | null;
};

const initState: StateType = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
};

export const enum Auth_ACTION_TYPE {
  SET_USER,
  REFRESH_ACCESS_TOKEN,
  LOGOUT_USER,
}

type ReducerAction = {
  type: Auth_ACTION_TYPE;
  payload?: any;
};

const reducer = (
  state: StateType,
  { type, payload }: ReducerAction
): StateType => {
  switch (type) {
    case Auth_ACTION_TYPE.SET_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: payload.user,
        accessToken: payload.accessToken,
      };
    case Auth_ACTION_TYPE.REFRESH_ACCESS_TOKEN:
      const user = jwtDecode<IUser>(payload.accessToken);
      return {
        ...state,
        isAuthenticated: true,
        user,
        accessToken: payload.accessToken,
      };
    case Auth_ACTION_TYPE.LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        accessToken: null,
      };
    default:
      throw new Error('there is no type called ' + type);
  }
};

interface IAuthContext extends StateType {
  dispatch: (type: Auth_ACTION_TYPE, payload?: any) => void;
}

const AuthContext = createContext<IAuthContext>({
  ...initState,
  dispatch: () => {},
});

export const AuthProvider = ({
  children,
}: {
  children?: ReactElement | ReactElement[] | undefined;
}): ReactElement => {
  const [state, defaultDispatch] = useReducer(reducer, initState);

  const dispatch = (type: Auth_ACTION_TYPE, payload?: any) =>
    defaultDispatch({ type, payload });

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
