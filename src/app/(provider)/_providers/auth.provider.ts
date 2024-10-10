"use client";
import { supabase } from "@/supabase/client";
import { useAuthStore } from "@/zustand/auth.store";
import { PropsWithChildren, useEffect } from "react";

function AuthProvider({ children }: PropsWithChildren) {
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  const setAuthInitialized = useAuthStore((state) => state.setAuthInitialized);
  useEffect(() => {
    supabase.auth.onAuthStateChange((_name, session) => {
      if (session) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setAuthInitialized();
    });
  }, []);
  return children;
}

export default AuthProvider;
