/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { supabase } from "@/supabase/client";
import { useAuthStore } from "@/zustand/auth.store";
import { PropsWithChildren, useEffect } from "react";

function AuthProvider({ children }: PropsWithChildren) {
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  const setAuthInitialized = useAuthStore((state) => state.setAuthInitialized);
  const setCurrentUserId = useAuthStore((state) => state.setCurrentUserId);
  useEffect(() => {
    supabase.auth.onAuthStateChange((_name, session) => {
      if (session) {
        const userId = session.user.id;
        setCurrentUserId(userId);
        setIsLoggedIn(true);
      } else {
        setCurrentUserId(null);
        setIsLoggedIn(false);
      }
      setAuthInitialized();
    });
  }, []);
  return children;
}

export default AuthProvider;
