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
  passwordConfirm: string | null;
}
const initialErrMsgs = {
  email: null,
  password: null,
  passwordConfirm: null,
};

type CustomFormEvent = FormEvent<HTMLFormElement> & {
  target: FormEvent<HTMLFormElement>["target"] & {
    email: HTMLInputElement;
    password: HTMLInputElement;
    passwordConfirm: HTMLInputElement;
  };
};

function SignUpPage() {
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
    const passwordConfirm = e.target.passwordConfirm.value;

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
        password: "비밀번호을 입력해주세요",
      }));
    if (!passwordConfirm)
      return setErrMsgs((prevErrMsgs) => ({
        ...prevErrMsgs,
        passwordConfirm: "비밀번호를 재입력해주세요",
      }));
    if (password !== passwordConfirm)
      return setErrMsgs((prevErrMsgs) => ({
        ...prevErrMsgs,
        passwordConfirm: "비밀번호가 일치하지 않습니다",
      }));

    const userInfo: UserInfo = {
      email,
      password,
    };

    signUp(userInfo);
  };

  return (
    <Page width="md" className="flex flex-col items-center">
      <h1 className="mt-32 mb-10 text-3xl font-bold">회원가입 하기</h1>

      <form onSubmit={handleSubmitSignUpForm}>
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
          type="password"
          errorText={errMsgs.passwordConfirm}
          label="비밀번호 확인"
          name="passwordConfirm"
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
