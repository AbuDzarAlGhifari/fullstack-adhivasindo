import { authService } from '@/services';
import Cookies from 'js-cookie';
import { create } from 'zustand';

export const useAuthStore = create((set, get) => ({
    user: null,
    isInitialized: false,

    get isAuthenticated() {
        return !!get().user;
    },

    initAuthSync: async () => {
        const token = Cookies.get('auth_token');
        if (token) {
            try {
                const res = await authService.getCurrentUser();
                set({ user: res.data, isInitialized: true });
                return;
            } catch {
                Cookies.remove('auth_token');
            }
        }
        set({ user: null, isInitialized: true });
    },

    login: async ({ email, password }) => {
        const res = await authService.login({ email, password });
        Cookies.set('auth_token', res.data.access_token, {
            path: '/',
            sameSite: 'lax',
        });
        set({ user: res.data.user });
    },

    logout: () => {
        Cookies.remove('auth_token', { path: '/' });
        set({ user: null });
    },
}));
