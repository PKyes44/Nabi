"use client";
import Page from "@/components/Page/Page";
import { supabase } from "@/supabase/client";
import { useAuthStore } from "@/zustand/auth.store";
import Link from "next/link";

function Header() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const authInitialized = useAuthStore((state) => state.authInitialized);

  const handleClickLogOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="h-16 shadow-lg">
      <Page
        width="lg"
        isMain={false}
        className=" h-full flex items-center justify-between"
      >
        <Link href="/" className="text-2xl font-extrabold">
          나비
        </Link>

        <nav>
          {authInitialized ? (
            isLoggedIn ? (
              <button onClick={handleClickLogOut}>로그아웃</button>
            ) : (
              <ul className="flex gap-x-5">
                <li>
                  <Link href="/log-in">로그인</Link>
                </li>
                <li>
                  <Link href="/sign-up">회원가입</Link>
                </li>
              </ul>
            )
          ) : null}
        </nav>
      </Page>
    </header>
  );
}

export default Header;
