import { Role } from "@/types/profiles.types";
import { create } from "zustand";

export type CurrentUser = {
  userId: string;
  role: Role;
};

type AuthStore = {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  isAuthInitialized: boolean;
  setAuthInitialized: () => void;
  currentUser: CurrentUser | null;
  setCurrentUser: (currentUser: CurrentUser | null) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  isAuthInitialized: false,
  setAuthInitialized: () => set({ isAuthInitialized: true }),
  currentUser: null,
  setCurrentUser: (currentUser: CurrentUser | null) => set({ currentUser }),
}));
