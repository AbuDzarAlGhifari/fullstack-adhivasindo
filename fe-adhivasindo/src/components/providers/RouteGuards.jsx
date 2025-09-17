import { useAuthStore } from '@/store/authStore';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isInitialized } = useAuthStore();
    const location = useLocation();
    if (!isInitialized) return null;
    return isAuthenticated ? (
        children
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export const PublicRoute = ({ children, redirectTo = '/dashboard' }) => {
    const { isAuthenticated, isInitialized } = useAuthStore();
    if (!isInitialized) return null;
    return isAuthenticated ? <Navigate to={redirectTo} replace /> : children;
};
