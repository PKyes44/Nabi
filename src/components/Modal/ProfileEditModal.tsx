"use client";
import React, {
  ComponentProps,
  FormEvent,
  PropsWithChildren,
  useState,
} from "react";
import Modal from "./Modal";
import { useProfileEditModalStore } from "@/zustand/profileEditModal.stroe";
import InputGroup from "../Inputs/InputGroup";
import Button from "../Button/Button";
import { supabase } from "@/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/zustand/auth.store";
import clientApi from "@/api/clientSide/api";

interface InitialErrMsgs {
  nickname: string | null;
}
const initialErrMsgs = {
  nickname: null,
};

type CustomFormEvent = FormEvent<HTMLFormElement> & {
  target: FormEvent<HTMLFormElement>["target"] & {
    nickname: HTMLInputElement;
    profileImg: HTMLInputElement;
    backgroundImg: HTMLInputElement;
  };
};

function ProfileEditModal({ children }: PropsWithChildren) {
  const { isShowProfileEditModal, setIsShowProfileEditModal } =
    useProfileEditModalStore();

  const userId = useAuthStore((state) => state.currentUserId);

  const [errMsgs, setErrMsgs] = useState<InitialErrMsgs>(initialErrMsgs);

  // 에러 메시지 함수화
  const throwErrMsgs = (type: string, message: string) => {
    setErrMsgs((prevErrMsgs) => ({ ...prevErrMsgs, [type]: message }));
  };

  // 모달 백드랍 클릭 시 모달 닫기
  const handleClickOutOfRange: ComponentProps<"div">["onClick"] = (e) => {
    if (e.target === e.currentTarget) {
      setIsShowProfileEditModal(false);
    }
  };

  // 프로필 변경 함수
  const handleSubmitProfileEditForm: ComponentProps<"form">["onSubmit"] =
    async (e: CustomFormEvent) => {
      e.preventDefault();
      setErrMsgs(initialErrMsgs);

      const nickname = e.target.nickname.value;
      if (!nickname) return throwErrMsgs("nickname", "닉네임을 입력해 주세요");

      const img = e.target.profileImg.files?.[0];
      const response = await supabase.storage
        .from("profileImages")
        .upload(`${userId}`, img!, { upsert: true });
      console.log(response);
    };

  return (
    <>
      {isShowProfileEditModal && (
        <Modal
          onClickFn={handleClickOutOfRange}
          className="flex items-center justify-center"
        >
          <div className="w-[550px] h-[650px] bg-white flex flex-col gap-y-8 justify-start items-center rounded-lg p-12">
            <h1 className="text-2xl font-bold">프로필 수정</h1>

            <form
              onSubmit={handleSubmitProfileEditForm}
              className="flex flex-col text-center gap-y-4"
            >
              <InputGroup
                label="닉네임 변경"
                type="text"
                name="nickname"
                errorText={errMsgs.nickname}
              />
              <InputGroup
                label="프로필 사진 변경"
                type="file"
                name="profileImg"
              />
              <InputGroup
                label="배경 사진 변경"
                type="file"
                name="backgroundImg"
              />

              <Button
                size="md"
                intent="primary"
                textIntent="primary"
                className="mt-20"
                type="submit"
              >
                Save
              </Button>
            </form>
          </div>
        </Modal>
      )}
      {children}
    </>
  );
}

export default ProfileEditModal;
