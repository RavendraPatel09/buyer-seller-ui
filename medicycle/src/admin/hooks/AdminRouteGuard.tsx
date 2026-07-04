import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../store/authStore';
import { authService } from '../api/adminService';
import { LoadingScreen } from '../../components/common/LoadingScreen';

export function AdminRouteGuard() {
  const { isAuthenticated, isLoading, setAuth, clearAuth, setLoading } = useAdminAuth();
  const location = useLocation();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const user = await authService.verify();
        const token = localStorage.getItem('medicycle_admin_token')!;
        setAuth(user, token);
      } catch {
        clearAuth();
      }
    };

    if (isAuthenticated && !useAdminAuth.getState().user) {
      verifyToken();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, setAuth, clearAuth, setLoading]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
