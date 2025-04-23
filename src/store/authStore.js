import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),

            token: null,
            setToken: (token) => set({ token }),

            setLogout: () =>
            set({ user: null, token: null }),
        }),
        {
            name: 'user-auth',
            getStorage: () => localStorage,
        }
    )
);