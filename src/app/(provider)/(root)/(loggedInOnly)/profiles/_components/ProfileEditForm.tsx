"use client";
import clientApi from "@/api/clientSide/api";
import Button from "@/components/Button/Button";
import InputGroup from "@/components/Inputs/InputGroup";
import { CustomFormEvent } from "@/types/formEvent.types";
import { EditProfileData } from "@/types/profiles.types";
import { useAuthStore } from "@/zustand/auth.store";
import { useProfileEditModalStore } from "@/zustand/profileEditModal.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ComponentProps, useEffect, useState } from "react";

interface InitialErrMsgs {
  nickname: string | null;
}

const initialErrMsgs = {
  nickname: null,
};

function ProfileEditForm() {
  const queryClient = useQueryClient();

  const userId = useAuthStore((state) => state.currentUserId);
  const setIsShowProfileEditModal = useProfileEditModalStore(
    (state) => state.setIsShowProfileEditModal
  );

  const [errMsgs, setErrMsgs] = useState<InitialErrMsgs>(initialErrMsgs);
  const [isClickedPrimaryProfile, setIsClickedPrimaryProfile] = useState(false);
  const [isClickedPrimaryBg, setIsClickedPrimaryBg] = useState(false);

  // useMutation사용해서 기본 이미지로 변경하는 함수
  const { mutate: setPrimaryImage } = useMutation({
    mutationFn: (type: string) =>
      clientApi.profiles.setPrimaryImage(userId!, type),
  });

  // useMutation사용해서 프로필수정하는 함수
  const { mutate: editProfile } = useMutation({
    mutationFn: (profileData: EditProfileData) =>
      clientApi.profiles.editProfile(profileData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userProfiles", { userId }],
      });
      setIsShowProfileEditModal(false);
    },
  });

  // 프로필 변경 함수
  const handleSubmitProfileEditForm: ComponentProps<"form">["onSubmit"] =
    async (
      e: CustomFormEvent<{
        nickname: HTMLInputElement;
        profileImg: HTMLInputElement;
        backgroundImg: HTMLInputElement;
      }>
    ) => {
      e.preventDefault();
      setErrMsgs(initialErrMsgs);

      const nickname = e.target.nickname.value;
      if (!userId) return;

      if (isClickedPrimaryProfile) setPrimaryImage("profile");
      if (isClickedPrimaryBg) setPrimaryImage("background");

      const profileImg = e.target.profileImg.files?.[0];
      const bgImg = e.target.backgroundImg.files?.[0];

      const profileData: EditProfileData = {
        userId,
        nickname,
        profileImg,
        bgImg,
      };

      editProfile(profileData);
    };

  const handleClickPrimaryProfile: ComponentProps<"button">["onClick"] = async (
    e
  ) => {
    e.preventDefault();
    setIsClickedPrimaryProfile(true);
  };

  const handleCLickPrimaryBackground: ComponentProps<"button">["onClick"] =
    async (e) => {
      e.preventDefault();
      setIsClickedPrimaryBg(true);
    };

  useEffect(() => {}, []);
  return (
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
      <InputGroup label="프로필 사진 변경" type="file" name="profileImg" />
      <Button onClick={handleClickPrimaryProfile}>기본 이미지로 변경</Button>
      <InputGroup label="배경 사진 변경" type="file" name="backgroundImg" />
      <Button onClick={handleCLickPrimaryBackground}>기본 이미지로 변경</Button>

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
  );
}

export default ProfileEditForm;
