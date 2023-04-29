import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/middlewares/apiClient';

// ######################## Login ############################
const login = (user: { email: string; password: string }) =>
  axiosInstance({ url: '/auth/login', method: 'POST', data: user });

export function useLogin() {
  return useMutation({ mutationFn: login });
}

// ######################## Refresh Token #####################
export const refreshAccessToken = async () => {
  const { data } = await axiosInstance({ url: 'auth/refresh', method: 'GET' });
  return data;
};

// ######################## Get Me #####################
export const getMeFn = async () => {
  const { data } = await axiosInstance({ url: 'users/getMe', method: 'GET' });
  return data;
};

// ######################## LogOut ############################
const logout = async () => {
  const { data } = await axiosInstance({ url: '/auth/logout' });
  return data;
};

export function useLogout() {
  return useQuery({
    queryKey: ['logout'],
    queryFn: logout,
    enabled: false,
  });
}
