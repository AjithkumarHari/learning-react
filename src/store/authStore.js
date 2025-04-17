import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),

            isLoggedIn: false,
            setIsLoggedIn: () =>
                set((state) => ({ isLoggedIn: !state.isLoggedIn })),

            token: null,
            setToken: (token) => set({ token }),

            setLogout: () =>
                set({ user: null, isLoggedIn: false, token: null }),
        }),
        {
            name: 'user-auth',
            getStorage: () => localStorage,
        }
    )
);