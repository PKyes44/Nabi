"use client";

import { useAuthStore } from "@/zustand/auth.store";
import useSelectRoleModalStore from "@/zustand/modals/selectRoleModal.store";
import Link from "next/link";
import LoggedInNavigation from "./LoggedInNavigation";

function Navigation() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const authInitialized = useAuthStore((state) => state.isAuthInitialized);
  const userId = useAuthStore((state) => state.currentUserId);
  const setIsShowSelectRoleModal = useSelectRoleModalStore(
    (state) => state.setIsShowSelectRoleModal
  );
  const setAuthType = useSelectRoleModalStore((state) => state.setAuthType);
  const handleClickSignUp = () => {
    const type = "sign-up";
    setAuthType(type);
    setIsShowSelectRoleModal(true);
  };
  return (
    <nav>
      <ul className="flex gap-x-5 items-center">
        {authInitialized ? (
          isLoggedIn ? (
            <LoggedInNavigation userId={userId!} />
          ) : (
            <>
              <li className="w-10 aspect-square">
                <Link href="/free-meals/map">
                  <img
                    className="w-full aspect-square rounded-lg"
                    src="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/LinkToMap.png?t=2024-10-15T21%3A06%3A46.454Z"
                    alt="link to free-meals store map"
                  />
                </Link>
              </li>
              <li>
                <Link href="/log-in">로그인</Link>
              </li>
              <li>
                <button onClick={handleClickSignUp}>회원가입</button>
              </li>
            </>
          )
        ) : null}
      </ul>
    </nav>
  );
}

export default Navigation;
