import { useMutation, useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosPrivate } from '../axios';
import { useAuthContext } from '@/context/auth';

// ######################## Sign Up ############################
async function register(user: {
  name: string;
  email: string;
  password: string;
}) {
  const { data } = await axiosPrivate({
    url: '/auth/register',
    method: 'POST',
    data: user,
  });
  return data;
}

export function useRegister() {
  const location = useLocation();
  const from = location.state?.from.pathname || '/';
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      dispatch('SET_USER', data);
      navigate(from, { replace: true });
    },
  });
}

// ######################## Login ############################
const login = async (user: { email: string; password: string }) => {
  const { data } = await axiosPrivate({
    url: '/auth/login',
    method: 'POST',
    data: user,
  });
  return data;
};

export function useLogin() {
  const location = useLocation();
  const from = location.state?.from.pathname || '/';
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      dispatch('SET_USER', data);
      navigate(from, { replace: true });
    },
  });
}

// ######################## Refresh Token ############################
export const refreshTokenFn = async () => {
  const { data } = await axiosPrivate({
    url: 'auth/refresh',
    method: 'GET',
  });
  return data;
};

export function useRefreshToken({
  enabled,
  onSuccess,
  onError,
}: {
  enabled: boolean;
  onSuccess: (data: { accessToken: string }) => void;
  onError: () => void;
}) {
  return useQuery({
    queryKey: ['refresh-token'],
    queryFn: refreshTokenFn,
    enabled,
    onSuccess,
    onError,
  });
}

// ######################## LogOut ############################
export function useLogout() {
  const { dispatch } = useAuthContext();
  return useQuery({
    queryKey: ['logout'],
    queryFn: async () => {
      const { data } = await axiosPrivate({ url: '/auth/logout' });
      return data;
    },
    enabled: false,
    onSuccess: () => dispatch('LOGOUT_USER'),
  });
}
