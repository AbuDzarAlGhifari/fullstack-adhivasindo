import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';

const AuthProvider = ({ children }) => {
    const { initAuthSync, isInitialized } = useAuthStore();
    useEffect(() => {
        initAuthSync();
    }, [initAuthSync]);
    if (!isInitialized) return <div>Loading…</div>;
    return children;
};

export default AuthProvider;
