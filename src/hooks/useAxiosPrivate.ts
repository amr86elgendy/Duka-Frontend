import { useEffect } from 'react';
import { axiosPrivate } from '@/apis/axios';
import { useAuthContext } from '@/context/auth';
import { refreshTokenFn } from '@/apis/auth';

export default function useAxiosPrivate() {
  const { accessToken, dispatch } = useAuthContext();
  // console.log('useAxiosPrivate run');
  useEffect(() => {
    // console.log('effect useAxiosPrivate run');
    const reqIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const resIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevReq = error?.config;
        if (error.response?.status === 403 && !prevReq?.sent) {
          prevReq.sent = true;
          try {
            const data = await refreshTokenFn();
            dispatch('REFRESH_ACCESS_TOKEN', data);
            prevReq.headers.Authorization = `Bearer ${data.accessToken}`;
          } catch (err) {
            dispatch('LOGOUT_USER');
            return Promise.reject(error);
          }
          return axiosPrivate(prevReq);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosPrivate.interceptors.request.eject(reqIntercept);
      axiosPrivate.interceptors.response.eject(resIntercept);
    };
  }, [accessToken]);

  return axiosPrivate;
}
