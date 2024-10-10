"use client";
import api from "@/api/api";
import InputGroup from "@/components/Inputs/InputGroup";
import Page from "@/components/Page/Page";
import { UserInfo } from "@/type/supabase";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ComponentProps, FormEvent, useState } from "react";

interface InitialErrMsgs {
  email: string | null;
  password: string | null;
  nickname: string | null;
}
const initialErrMsgs = {
  email: null,
  password: null,
  nickname: null,
};

type CustomFormEvent = FormEvent<HTMLFormElement> & {
  target: FormEvent<HTMLFormElement>["target"] & {
    email: HTMLInputElement;
    password: HTMLInputElement;
    nickname: HTMLInputElement;
  };
};

interface SignUpPageProps {
  searchParams: {
    role: string;
  };
}

function SignUpPage({ searchParams: { role } }: SignUpPageProps) {
  const router = useRouter();
  const [errMsgs, setErrMsgs] = useState<InitialErrMsgs>(initialErrMsgs);

  const { mutate: signUp } = useMutation({
    mutationFn: (userInfo: UserInfo) => api.auth.signUp(userInfo),
    onSuccess: (...arg) => {
      console.log("success: ", arg);
      router.replace("/");
    },
    onError: (...arg) => {
      alert("회원가입 실패");
      console.log("error: ", arg);
    },
  });

  const handleSubmitSignUpForm: ComponentProps<"form">["onSubmit"] = async (
    e: CustomFormEvent
  ) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    setErrMsgs(initialErrMsgs);

    if (!email) {
      console.log("email is required");
      return setErrMsgs((prevErrMsgs) => ({
        ...prevErrMsgs,
        email: "이메일을 입력해주세요",
      }));
    }
    if (!password)
      return setErrMsgs((prevErrMsgs) => ({
        ...prevErrMsgs,
        password: "비밀번호를 입력해주세요",
      }));

    const userInfo: UserInfo = {
      email,
      password,
    };

    signUp(userInfo);
  };

  return (
    <Page width="md" className="flex flex-col items-center">
      <h1 className="mt-20 mb-10 text-3xl font-bold">회원가입 하기</h1>

      <form onSubmit={handleSubmitSignUpForm} className="flex gap-y-2 flex-col">
        <InputGroup
          type="email"
          errorText={errMsgs.email}
          label="이메일"
          name="email"
        />
        <InputGroup
          type="password"
          errorText={errMsgs.password}
          label="비밀번호"
          name="password"
        />
        <InputGroup
          type="text"
          errorText={errMsgs.nickname}
          label="닉네임"
          name="nickname"
        />

        <button
          className="mt-10 w-96 bg-indigo-300 text-white h-10 font-bold col-span-3"
          type="submit"
        >
          회원가입
        </button>
      </form>
    </Page>
  );
}

export default SignUpPage;
