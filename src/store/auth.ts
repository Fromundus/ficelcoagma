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
  logout: (registrationMethod: string | null) => Promise<void>;
  fetchUser: () => Promise<void>;
  sidebar: string;
  updateSidebar: (status: string) => void;
  registrationMethod: string | null;
  updateRegistrationMethod: (type: string) => void;
};

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      sidebar: 'true',
      registrationMethod: null,
      login: (user, token) => set({ user, token }),
      logout: async (registrationMethod: string | null) => {
        const data = {
          registration_method: registrationMethod,
        }

        try {
          const res = await api.post('/logout', data);
          console.log(res);
          set({ user: null, token: null });
          localStorage.removeItem('auth-storage');
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
            set({ user: null, token: null });
            localStorage.removeItem('auth-storage');
          }
          // Optional: logout or redirect to login if token is invalid
        }
      },
      updateSidebar: (status: string) => {
        set({ sidebar: status });
      },
      updateRegistrationMethod: (type: string) => {
        set({ registrationMethod: type });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, token: state.token, sidebar: state.sidebar, registrationMethod: state.registrationMethod }),
    }
  )
);
