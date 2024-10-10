import { create } from "zustand";

type useAuthState = {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  authInitialized: boolean;
  setAuthInitialized: () => void;
};

export const useAuthStore = create<useAuthState>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  authInitialized: false,
  setAuthInitialized: () => set({ authInitialized: true }),
}));
