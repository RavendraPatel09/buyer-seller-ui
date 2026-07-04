import { create } from 'zustand';
import type { AdminUser } from '../types';

interface AdminAuthStore {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (user: AdminUser, token: string) => void;
  clearAuth: () => void;
  setLoading: (val: boolean) => void;
}

const TOKEN_KEY = 'medicycle_admin_token';

export const useAdminAuth = create<AdminAuthStore>((set) => ({
  user: null,
  token: localStorage.getItem(TOKEN_KEY),
  isAuthenticated: !!localStorage.getItem(TOKEN_KEY),
  isLoading: true,
  setAuth: (user, token) => {
    localStorage.setItem(TOKEN_KEY, token);
    set({ user, token, isAuthenticated: true, isLoading: false });
  },
  clearAuth: () => {
    localStorage.removeItem(TOKEN_KEY);
    set({ user: null, token: null, isAuthenticated: false, isLoading: false });
  },
  setLoading: (val) => set({ isLoading: val }),
}));
