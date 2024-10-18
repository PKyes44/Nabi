/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import clientApi from "@/api/clientSide/api";
import { supabase } from "@/supabase/client";
import { useAuthStore } from "@/zustand/auth.store";
import { PropsWithChildren, useEffect } from "react";

function AuthProvider({ children }: PropsWithChildren) {
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  const setAuthInitialized = useAuthStore((state) => state.setAuthInitialized);
  const setCurrentUserId = useAuthStore((state) => state.setCurrentUserId);
  const setRoleType = useAuthStore((state) => state.setRoleType);
  const userId = useAuthStore((state) => state.currentUserId);

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

  useEffect(() => {
    (async () => {
      if (!userId) return;
      const response = await clientApi.profiles.getProfileByUserId(userId);
      const roleType = response?.role as "sponsor" | "recipient";
      setRoleType(roleType);
    })();
  }, [userId]);

  return children;
}

export default AuthProvider;
