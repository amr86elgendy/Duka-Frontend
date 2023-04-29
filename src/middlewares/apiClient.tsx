import { ReactElement } from 'react';
import axios from 'axios';
import { refreshAccessToken } from '@/apis/auth';
import { useAuthContext } from '@/context/auth';

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_LOCAL_URL}/api`,
  withCredentials: true,
  headers: {
    language: 'en',
  },
});

export default function ApiClientMiddleware({
  children,
}: {
  children: ReactElement;
}) {
  const { dispatch, accessToken } = useAuthContext();
  console.log('ApiClientMiddleware run');

  axiosInstance.interceptors.request.use(
    (config) => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevReq = error?.config;
      // console.log({ prevReq });

      if (error.response?.status === 403 && !prevReq?.sent) {
        prevReq.sent = true;
        try {
          const data = await refreshAccessToken();
          prevReq.headers.Authorization = `Bearer ${data.accessToken}`;
          dispatch('REFRESH_ACCESS_TOKEN', data);
          return await axiosInstance(prevReq);
        } catch (err) {
          window.location.assign('/login');
        }
      }
      return Promise.reject(error);
    }
  );

  return children;
}
