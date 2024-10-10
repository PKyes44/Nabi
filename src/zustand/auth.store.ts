import { create } from "zustand";

type useAuthState = {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  isAuthInitialized: boolean;
  setAuthInitialized: () => void;
};

export const useAuthStore = create<useAuthState>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  isAuthInitialized: false,
  setAuthInitialized: () => set({ isAuthInitialized: true }),
}));
