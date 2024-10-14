import { create } from "zustand";

type AuthStore = {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  isAuthInitialized: boolean;
  setAuthInitialized: () => void;
  currentUserId: string | null;
  setCurrentUserId: (userId: string | null) => void;
  roleType: string | undefined;
  setRoleType: (roleType: string | undefined) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  isAuthInitialized: false,
  setAuthInitialized: () => set({ isAuthInitialized: true }),
  currentUserId: null,
  setCurrentUserId: (userId: string | null) => set({ currentUserId: userId }),
  roleType: undefined,
  setRoleType: (roleType) => set({ roleType }),
}));
