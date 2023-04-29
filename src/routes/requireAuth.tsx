import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '@/context/auth';

export default function RequireAuth() {
  const { isAuthenticated } = useAuthContext();
  const location = useLocation();
  console.log('require auth running', { isAuthenticated });
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
