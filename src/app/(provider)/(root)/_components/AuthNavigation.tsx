"use client";

import { supabase } from "@/supabase/client";
import { useAuthStore } from "@/zustand/auth.store";
import Link from "next/link";

function AuthNavigation() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const authInitialized = useAuthStore((state) => state.authInitialized);

  const handleClickLogOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav>
      <ul className="flex gap-x-5">
        {authInitialized ? (
          isLoggedIn ? (
            <>
              <li>
                <Link href="/profiles">프로필</Link>
              </li>
              <li>
                <button onClick={handleClickLogOut}>로그아웃</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/auth?type=log-in">로그인</Link>
              </li>
              <li>
                <Link href="/auth?type=sign-up">회원가입</Link>
              </li>
            </>
          )
        ) : null}
      </ul>
    </nav>
  );
}

export default AuthNavigation;
