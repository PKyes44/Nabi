/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import clientApi from "@/api/clientSide/api";
import { supabase } from "@/supabase/client";
import { useAuthStore } from "@/zustand/auth.store";
import { PropsWithChildren, useEffect } from "react";

function AuthProvider({ children }: PropsWithChildren) {
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  const setAuthInitialized = useAuthStore((state) => state.setAuthInitialized);
  const setUser = useAuthStore((state) => state.setCurrentUser);

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (_name, session) => {
      if (session) {
        const userId = session.user.id;
        const response = await clientApi.profiles.getProfileByUserId(userId);
        const role = response?.role as "sponsor" | "recipient";
        setUser({ userId, role });
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
      setAuthInitialized();
    });
  }, []);

  return children;
}

export default AuthProvider;
