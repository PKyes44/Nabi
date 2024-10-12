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
import { useAuthStore } from "@/zustand/auth.store";
import clientApi from "@/api/clientSide/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditProfileData } from "@/types/profiles.types";

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
  const queryClient = useQueryClient();
  const { isShowProfileEditModal, setIsShowProfileEditModal } =
    useProfileEditModalStore();

  const userId = useAuthStore((state) => state.currentUserId);

  const [errMsgs, setErrMsgs] = useState<InitialErrMsgs>(initialErrMsgs);

  // useMutation사용해서 프로필수정 함수 정의
  const { mutate: editProfile } = useMutation({
    mutationFn: (profileData: EditProfileData) =>
      clientApi.profiles.editProfile(profileData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userProfiles", { userId }],
        exact: true,
      });
    },
  });

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
      if (!userId) return;

      const profileImg = e.target.profileImg.files?.[0];
      const bgImg = e.target.backgroundImg.files?.[0];

      const profileData: EditProfileData = {
        userId,
        nickname,
        profileImg,
        bgImg,
      };

      editProfile(profileData);
      setIsShowProfileEditModal(false);
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
                helpText="사진을 선택하지 않으면 기본 이미지로 변경됩니다"
              />
              <InputGroup
                label="배경 사진 변경"
                type="file"
                name="backgroundImg"
                helpText="사진을 선택하지 않으면 기본 이미지로 변경됩니다"
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
