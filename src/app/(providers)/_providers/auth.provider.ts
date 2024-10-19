/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import clientApi from "@/api/clientSide/api";
import { supabase } from "@/supabase/client";
import { useAuthStore } from "@/zustand/auth.store";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

function AuthProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  const setAuthInitialized = useAuthStore((state) => state.setAuthInitialized);
  const setUser = useAuthStore((state) => state.setCurrentUser);

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (_eventName, session) => {
      if (session) {
        const userId = session.user.id;
        try {
          const response = await clientApi.profiles.getProfileByUserId(userId);
          const role = response?.role as "sponsor" | "recipient";
          const user = { userId, role };
          setUser(user);
        } catch (e) {
          console.log(e);
        }
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
      setAuthInitialized();
    });
  }, []);

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (eventName) => {
      if (eventName === "SIGNED_IN") router.replace("/");
    });
  }, []);

  return children;
}

export default AuthProvider;
