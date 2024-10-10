"use client";

import { supabase } from "@/supabase/client";
import { useAuthStore } from "@/zustand/auth.store";
import useModalStore from "@/zustand/modal.store";
import Link from "next/link";

function AuthNavigation() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const authInitialized = useAuthStore((state) => state.isAuthInitialized);
  const setIsShowSelectRoleModal = useModalStore(
    (state) => state.setIsShowSelectRoleModal
  );
  const setAuthType = useModalStore((state) => state.setAuthType);

  const handleClickLogOut = async () => {
    await supabase.auth.signOut();
  };
  const handleClickAuth = (type: "log-in" | "sign-up") => {
    setAuthType(type);
    setIsShowSelectRoleModal(true);
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
                <button onClick={() => handleClickAuth("log-in")}>
                  로그인
                </button>
              </li>
              <li>
                <button onClick={() => handleClickAuth("sign-up")}>
                  회원가입
                </button>
              </li>
            </>
          )
        ) : null}
      </ul>
    </nav>
  );
}

export default AuthNavigation;
