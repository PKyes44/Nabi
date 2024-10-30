import clientApi from "@/api/clientSide/api";
import { UserInfo } from "@/types/auth.types";
import { CustomFormEvent } from "@/types/formEvent.types";
import { ToastType } from "@/types/toast.types";
import { useAuthStore } from "@/zustand/auth.store";
import { useToastStore } from "@/zustand/toast.store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ComponentProps, useState } from "react";

interface InitialErrMsgs {
  email: string | null;
  password: string | null;
  global: string | null;
}
const initialErrMsgs = {
  email: null,
  password: null,
  global: null,
};

type LogInFormEvent = CustomFormEvent<{
  email: HTMLInputElement;
  password: HTMLInputElement;
}>;

function useLogIn() {
  const router = useRouter();
  const addToast = useToastStore((state) => state.addToast);
  const [errMsgs, setErrMsgs] = useState<InitialErrMsgs>(initialErrMsgs);
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);

  const { mutate: logIn } = useMutation({
    mutationFn: (logInData: UserInfo) => clientApi.auth.logIn(logInData),
    onSuccess: async (userId) => {
      const response = await clientApi.profiles.getProfileByUserId(userId);

      const role = response?.role as "sponsor" | "recipient";
      const user = {
        userId,
        role,
      };

      setCurrentUser(user);
      const id = crypto.randomUUID();
      const title = "로그인 성공";
      const content = "로그인에 성공하였습니다";
      const type = "success";
      const toast: ToastType = {
        id,
        title,
        content,
        type,
      };
      addToast(toast);
      router.replace("/");
    },
    onError: (...arg) => {
      setErrMsgs((prevErrMsgs) => ({
        ...prevErrMsgs,
        global: "로그인에 실패하였습니다",
      }));
      const id = crypto.randomUUID();
      const title = "로그인 실패";
      const content = "로그인에 실패하였습니다";
      const type = "fail";
      const toast: ToastType = {
        id,
        title,
        content,
        type,
      };
      addToast(toast);
      console.log("error: ", arg);
    },
  });

  const throwErrMsgs = (type: string, message: string) => {
    setErrMsgs((prevErrMsgs) => ({ ...prevErrMsgs, [type]: message }));
  };

  const handleSubmitLogInForm: ComponentProps<"form">["onSubmit"] = async (
    e: LogInFormEvent
  ) => {
    e.preventDefault();

    setErrMsgs(initialErrMsgs);

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email) return throwErrMsgs("email", "이메일을 입력해주세요");
    if (!password) return throwErrMsgs("password", "비밀번호를 입력해주세요");

    const logInData: UserInfo = {
      email,
      password,
    };

    logIn(logInData);
  };

  return {
    errMsgs,
    handleSubmitLogInForm,
  };
}

export default useLogIn;
