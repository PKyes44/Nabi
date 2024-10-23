/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import clientApi from "@/api/clientSide/api";
import { supabase } from "@/supabase/client";
import { useAuthStore } from "@/zustand/auth.store";
import { PropsWithChildren, useEffect, useState } from "react";

function AuthProvider({ children }: PropsWithChildren) {
  const [userId, setUserId] = useState<string | null>(null);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setAuthInitialized = useAuthStore((state) => state.setAuthInitialized);
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (_eventName, session) => {
      if (session) {
        setUserId(session.user.id);
        setIsLoggedIn(true);
      } else {
        setUserId(null);
        setIsLoggedIn(false);
      }
      setAuthInitialized();
    });
  }, []);

  useEffect(() => {
    (async () => {
      if (!isLoggedIn || !userId) return;

      const response = await clientApi.profiles.getProfileByUserId(userId);
      const role = response?.role as "sponsor" | "recipient";
      const currentUser = { userId, role };
      console.log("login session: ", currentUser);
      setCurrentUser(currentUser);
    })();
  }, [isLoggedIn]);

  return children;
}

export default AuthProvider;
