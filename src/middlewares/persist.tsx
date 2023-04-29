import { ReactElement, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { refreshAccessToken } from '../apis/auth';
import { useAuthContext } from '../context/auth';
// import FullScreenLoader from '@/components/Loader';

export default function PersistMiddleware({
  children,
}: {
  children: ReactElement;
}) {
  const [isLoading, setLoading] = useState(true);
  const rememberMe = JSON.parse(localStorage.getItem('remember-me')!);
  const { isAuthenticated, dispatch } = useAuthContext();
  console.log('Persist middleware run', { rememberMe });

  const { fetchStatus } = useQuery({
    queryKey: ['refresh-token'],
    queryFn: refreshAccessToken,
    enabled: !!(!isAuthenticated && rememberMe),

    onSuccess: (data) => {
      dispatch('REFRESH_ACCESS_TOKEN', data);
    },
  });

  useEffect(() => {
    if (fetchStatus === 'idle') {
      setLoading(false);
    }
  }, [fetchStatus]);

  if (isLoading) {
    return <div>loading</div>;
  }

  return children;
}
