import {create } from 'zustand';

export const useStore = create((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    isLoggedIn: false,
    setIsLoggedIn: () => set((state) => ({ isLoggedIn: !state.isLoggedIn })),
    token: null,
    setToken: (token) => set({ token }),
    setLogout: () => set({ user: null, isLoggedIn: false, token: null }),  
}));