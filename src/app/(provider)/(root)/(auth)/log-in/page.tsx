"use client";
import api from "@/api/api";
import InputGroup from "@/components/Inputs/InputGroup";
import Page from "@/components/Page";
import { UserInfo } from "@/type/supabase";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ComponentProps, FormEvent, useState } from "react";

interface InitialErrMsgs {
  email: string | null;
  password: string | null;
}
const initialErrMsgs = {
  email: null,
  password: null,
};

type CustomFormEvent = FormEvent<HTMLFormElement> & {
  target: FormEvent<HTMLFormElement>["target"] & {
    email: HTMLInputElement;
    password: HTMLInputElement;
  };
};

function LogInPage() {
  const router = useRouter();
  const [errMsgs, setErrMsgs] = useState<InitialErrMsgs>(initialErrMsgs);

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
    e: CustomFormEvent
  ) => {
    e.preventDefault();
    setErrMsgs(initialErrMsgs);

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email)
      return setErrMsgs((prevErrMsgs) => ({
        ...prevErrMsgs,
        email: "이메일을 입력해주세요",
      }));
    if (!password)
      return setErrMsgs((prevErrMsgs) => ({
        ...prevErrMsgs,
        password: "비밀번호를 입력해주세요",
      }));

    const logInData: UserInfo = {
      email,
      password,
    };

    logIn(logInData);
  };

  return (
    <Page width="sm" className="flex flex-col items-center">
      <h1 className="mt-32 mb-10 text-3xl font-bold">로그인 하기</h1>

      <form onSubmit={handleSubmitLogInForm}>
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

        <button
          className="mt-10 w-96 bg-indigo-300 text-white h-10 font-bold col-span-3"
          type="submit"
        >
          로그인
        </button>
      </form>
    </Page>
  );
}

export default LogInPage;
