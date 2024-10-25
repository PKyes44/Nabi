"use client";

import { useAuthStore } from "@/zustand/auth.store";
import { useModalStore } from "@/zustand/modal.store";
import Link from "next/link";
import SelectRoleModal from "../Modals/SelectRoleModal";
import LoggedInNavigation from "./LoggedInNavigation";

function Navigation() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const authInitialized = useAuthStore((state) => state.isAuthInitialized);
  const user = useAuthStore((state) => state.currentUser);
  const setActiveModal = useModalStore((state) => state.setActiveModal);
  const handleClickSignUp = () => {
    setActiveModal(<SelectRoleModal />);
  };
  return (
    <nav>
      <ul className="flex gap-x-5 items-center justify-center">
        {authInitialized ? (
          isLoggedIn ? (
            <LoggedInNavigation userId={user?.userId!} />
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
        ) : (
          <div className="flex gap-x-5 items-center justify-center">
            <div className="w-10 h-10 rounded-2xl bg-gray-200"></div>
            <div className="w-10 h-10 rounded-2xl bg-gray-200" />
          </div>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
