"use client";
import api from "@/api/api";
import { UserInfo } from "@/type/supabase";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ComponentProps, useRef } from "react";

function SignUpPage() {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmRef = useRef<HTMLInputElement | null>(null);

  const { mutate: signUp } = useMutation({
    mutationFn: (userInfo: UserInfo) => api.auth.signUp(userInfo),
    onSuccess: (...arg) => {
      console.log("success: ", arg);
      router.replace("/");
    },
    onError: (...arg) => {
      console.log("error: ", arg);
    },
  });

  const handleSubmitSignUpForm: ComponentProps<"form">["onSubmit"] = async (
    e
  ) => {
    e.preventDefault();

    if (!emailRef || !emailRef.current) return;
    if (!passwordRef || !passwordRef.current) return;
    if (!passwordConfirmRef || !passwordConfirmRef.current) return;

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const passwordConfirm = passwordConfirmRef.current.value;

    if (!email) return alert("이메일을 입력해주세요");
    if (!password) return alert("비밀번호를 입력해주세요");
    if (!passwordConfirm) return alert("비밀번호를 재입력 해주세요");
    if (password !== passwordConfirm)
      return alert("비밀번호가 일치하지 않습니다");

    const userInfo: UserInfo = {
      email,
      password,
    };

    signUp(userInfo);
  };

  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className="mt-32 mb-10 text-3xl font-bold">회원가입 하기</h1>

      <form
        onSubmit={handleSubmitSignUpForm}
        className="grid grid-cols-3 gap-5"
      >
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          ref={emailRef}
          className="col-span-2 border border-black/35"
          id="email"
        />
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          ref={passwordRef}
          className="col-span-2 border border-black/35"
          id="password"
        />
        <label htmlFor="password_confirm">비밀번호 확인</label>
        <input
          type="password"
          ref={passwordConfirmRef}
          className="col-span-2 border border-black/35"
          id="password_confirm"
        />

        <button
          className="bg-indigo-300 text-white h-10 font-bold col-span-3"
          type="submit"
        >
          회원가입
        </button>
      </form>
    </main>
  );
}

export default SignUpPage;
