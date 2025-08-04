import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../api/axios';
import type { User } from '../types/User';

// type User = {
//   id: number;
//   name: string;
//   email: string;
//   role: 'pre' | 'ons' | 'admin';
// };

type AuthStore = {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
};

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (user, token) => set({ user, token }),
      logout: async () => {
        try {
          const res = await api.post('/logout');
          console.log(res);
          localStorage.removeItem('auth-storage');
          set({ user: null, token: null });
          window.location.href = `${res.data.loginUrl}`;
        } catch (e) {
          console.error('Logout failed', e);
        }
      },
      fetchUser: async () => {
        try {
          const res = await api.get('/me');
          console.log(res);
          if(res.data.status === "inactive"){
            localStorage.removeItem('auth-storage');
            set({ user: null, token: null });
          } else {
            set({ user: res.data });
          }
        } catch (e: any) {
          console.error('Failed to fetch user:', e);
          if(e?.status === 401 || e?.status === 403){
            localStorage.removeItem('auth-storage');
            set({ user: null, token: null });
          }
          // Optional: logout or redirect to login if token is invalid
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);
