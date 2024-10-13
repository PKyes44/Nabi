"use client";

import clientApi from "@/api/clientSide/api";
import { supabase } from "@/supabase/client";
import { useAuthStore } from "@/zustand/auth.store";
import useSelectRoleModalStore from "@/zustand/selectRoleModal.store";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

function Navigation() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const authInitialized = useAuthStore((state) => state.isAuthInitialized);
  const userId = useAuthStore((state) => state.currentUserId);
  const setIsShowSelectRoleModal = useSelectRoleModalStore(
    (state) => state.setIsShowSelectRoleModal
  );
  const setAuthType = useSelectRoleModalStore((state) => state.setAuthType);

  const { data: isStoreOwner } = useQuery({
    queryKey: ["storeOwners"],
    queryFn: () => clientApi.storeOwners.isStoreOwnerByUserId(userId),
  });

  const handleClickLogOut = async () => {
    await supabase.auth.signOut();
  };
  const handleClickSignUp = () => {
    const type = "sign-up";
    setAuthType(type);
    setIsShowSelectRoleModal(true);
  };
  return (
    <nav>
      <ul className="flex gap-x-5">
        {authInitialized ? (
          isLoggedIn ? (
            <>
              {isStoreOwner && (
                <li>
                  <Link href="free-meals/new">무상식사 제공하기</Link>
                </li>
              )}
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
