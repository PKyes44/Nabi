import clientApi from "@/api/clientSide/api";
import { TablesInsert } from "@/supabase/database.types";
import { UserInfo } from "@/types/auth.types";
import { CustomFormEvent } from "@/types/formEvent.types";
import { Role } from "@/types/profiles.types";
import { ToastType } from "@/types/toast.types";
import { useAuthStore } from "@/zustand/auth.store";
import { useToastStore } from "@/zustand/toast.store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ComponentProps, useState } from "react";

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

type SignUpFormEvent = CustomFormEvent<{
  email: HTMLInputElement;
  password: HTMLInputElement;
  nickname: HTMLInputElement;
}>;

type SignUpHookProps = Role;

function useSignUp(role: SignUpHookProps) {
  const router = useRouter();
  const [errMsgs, setErrMsgs] = useState<InitialErrMsgs>(initialErrMsgs);
  const [nickname, setNickname] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const addToast = useToastStore((state) => state.addToast);
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);

  const { mutate: signUp } = useMutation({
    mutationFn: (userInfo: UserInfo) => clientApi.auth.signUp(userInfo),
    onSuccess: (userData) => {
      if (!nickname) return throwErrMsgs("nickname", "닉네임을 입력해주세요");
      if (!email) return throwErrMsgs("email", "이메일을 입력해주세요");

      const userId = userData.user!.id;

      const insertProfileData: TablesInsert<"userProfiles"> = {
        userId,
        nickname,
        email,
        role,
      };
      insertProfile(insertProfileData);
    },
    onError: (...arg) => {
      const id = crypto.randomUUID();
      const title = "회원가입 실패";
      const content = "회원가입에 실패하였습니다";
      const type = "fail";
      const toast: ToastType = {
        id,
        title,
        content,
        type,
      };
      addToast(toast);
    },
  });

  const { mutate: insertProfile } = useMutation({
    mutationFn: (insertProfileData: TablesInsert<"userProfiles">) =>
      clientApi.profiles.insertProfile(insertProfileData),
    onSuccess: (data) => {
      const user = {
        userId: data.userId,
        role: data.role,
      };
      setCurrentUser(user);

      const id = crypto.randomUUID();
      const title = "회원가입 성공";
      const content = "회원가입에 성공하였습니다";
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
    onError: () => {
      const id = crypto.randomUUID();
      const title = "회원가입 실패";
      const content = "회원가입에 실패하였습니다";
      const type = "fail";
      const toast: ToastType = {
        id,
        title,
        content,
        type,
      };
      addToast(toast);
    },
  });

  const throwErrMsgs = (type: string, message: string) => {
    setErrMsgs((prevErrMsgs) => ({ ...prevErrMsgs, [type]: message }));
  };

  const handleSubmitSignUpForm: ComponentProps<"form">["onSubmit"] = async (
    e: SignUpFormEvent
  ) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const nickname = e.target.nickname.value;

    setErrMsgs(initialErrMsgs);

    if (!email) return throwErrMsgs("email", "이메일을 입력해주세요");
    if (!password) return throwErrMsgs("password", "비밀번호를 입력해주세요");
    if (!nickname) return throwErrMsgs("nickname", "닉네임을 입력해주세요");

    setNickname(nickname);
    setEmail(email);
    const userInfo: UserInfo = {
      email,
      password,
    };

    signUp(userInfo);
  };

  return {
    errMsgs,
    handleSubmitSignUpForm,
  };
}

export default useSignUp;
