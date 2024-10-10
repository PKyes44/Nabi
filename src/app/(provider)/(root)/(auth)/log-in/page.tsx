"use client";
import api from "@/api/api";
import Page from "@/components/Page/Page";
import { UserInfo } from "@/type/supabase";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ComponentProps, useRef } from "react";

function LogInPage() {
  const router = useRouter();

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const { mutate: logIn } = useMutation({
    mutationFn: (logInData: UserInfo) => api.auth.logIn(logInData),
    onSuccess: (...arg) => {
      console.log("success: ", arg);
      router.replace("/");
    },
    onError: (...arg) => {
      alert("로그인 실패");
      console.log("error: ", arg);
    },
  });

  const handleSubmitLogInForm: ComponentProps<"form">["onSubmit"] = async (
    e
  ) => {
    e.preventDefault();
    if (!emailRef || !emailRef.current) return;
    if (!passwordRef || !passwordRef.current) return;

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email) return alert("이메일을 입력해주세요");
    if (!password) return alert("비밀번호를 입력해주세요");

    const logInData: UserInfo = {
      email,
      password,
    };

    logIn(logInData);
  };

  return (
    <Page width="sm">
      <h1 className="mt-32 mb-10 text-3xl font-bold">로그인 하기</h1>

      <form onSubmit={handleSubmitLogInForm} className="grid grid-cols-3 gap-5">
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="email"
          ref={emailRef}
          className="col-span-2 border border-black/35"
        />
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          ref={passwordRef}
          className="col-span-2 border border-black/35"
        />

        <button
          className="bg-indigo-300 text-white h-10 font-bold col-span-3"
          type="submit"
        >
          로그인
        </button>
      </form>
    </Page>
  );
}

export default LogInPage;
