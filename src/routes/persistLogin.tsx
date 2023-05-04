import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuthContext } from '@/context/auth';
import LoaderFallback from '@/components/services/Loader';
import { useRefreshToken } from '@/apis/auth';

export default function PersistLogin() {
  const [isLoading, setLoading] = useState(true);
  const rememberMe = JSON.parse(localStorage.getItem('ishop-remember-me')!);
  const { isAuthenticated, status, dispatch } = useAuthContext();

  console.log('Persist login run');
  const { fetchStatus } = useRefreshToken({
    enabled: !!(!isAuthenticated && rememberMe && status === 'unknown'),
    onSuccess: (data) => dispatch('REFRESH_ACCESS_TOKEN', data),
    onError: () => dispatch('LOGOUT_USER'),
  });

  useEffect(() => {
    if (fetchStatus === 'idle') {
      setLoading(false);
    }
  }, [fetchStatus]);

  if (isLoading) return <LoaderFallback />;
  return <Outlet />;
}
