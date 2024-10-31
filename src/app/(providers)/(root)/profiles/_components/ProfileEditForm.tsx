"use client";
import clientApi from "@/api/clientSide/api";
import ButtonGroup from "@/components/Button/ButtonGroup";
import InputGroup from "@/components/Inputs/InputGroup";
import { CustomFormEvent } from "@/types/formEvent.types";
import { EditProfileData } from "@/types/profiles.types";
import { ToastType } from "@/types/toast.types";
import { useAuthStore } from "@/zustand/auth.store";
import { useModalStore } from "@/zustand/modal.store";
import { useToastStore } from "@/zustand/toast.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { ComponentProps, useState } from "react";

interface InitialErrMsgs {
  nickname: string | null;
}

const initialErrMsgs = {
  nickname: null,
};

interface ProfileEditForm {
  profileImage: string | null;
  bgImage: string | null;
}

const DEFAULT_PROFILE_IMG =
  "https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/BigDefaultProfile.png?t=2024-10-17T21%3A23%3A00.314Z";

function ProfileEditForm({ profileImage, bgImage }: ProfileEditForm) {
  const queryClient = useQueryClient();

  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null
  );
  const [bgImagePreview, setBgImagePreview] = useState<string | null>(null);

  const user = useAuthStore((state) => state.currentUser);
  const setActiveModal = useModalStore((state) => state.setActiveModal);

  const [errMsgs, setErrMsgs] = useState<InitialErrMsgs>(initialErrMsgs);
  const [isClickedPrimaryProfile, setIsClickedPrimaryProfile] = useState(false);
  const [isClickedPrimaryBg, setIsClickedPrimaryBg] = useState(false);
  const addToast = useToastStore((state) => state.addToast);

  // useMutation사용해서 기본 이미지로 변경하는 함수
  const { mutate: setPrimaryImage } = useMutation({
    mutationFn: (type: string) =>
      clientApi.profiles.setPrimaryImage(user?.userId!, type),
  });

  // useMutation사용해서 프로필수정하는 함수
  const { mutate: editProfile } = useMutation({
    mutationFn: (profileData: EditProfileData) =>
      clientApi.profiles.editProfile(profileData),
    onSuccess: () => {
      const toast: ToastType = {
        id: crypto.randomUUID(),
        title: "프로필 수정 성공",
        content:
          "프로필 수정에 성공하였습니다. 이미지는 적용되는 데에 시간이 걸릴 수 있습니다",
        type: "success",
      };
      addToast(toast);

      queryClient.invalidateQueries({
        queryKey: ["userProfiles", { showUserId: user?.userId }],
      });

      setActiveModal(null);
    },
    onError: () => {
      const toast: ToastType = {
        id: crypto.randomUUID(),
        title: "프로필 수정 실패",
        content: "프로필 수정에 실패하였습니다",
        type: "fail",
      };
      addToast(toast);
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
      if (!user?.userId) return;

      if (isClickedPrimaryProfile) setPrimaryImage("profile");
      if (isClickedPrimaryBg) setPrimaryImage("background");

      const profileImg = e.target.profileImg.files?.[0];
      const bgImg = e.target.backgroundImg.files?.[0];

      if (
        nickname.length === 0 &&
        !profileImg &&
        !bgImg &&
        !isClickedPrimaryBg &&
        !isClickedPrimaryProfile
      )
        return setActiveModal(null);

      const profileData: EditProfileData = {
        userId: user.userId,
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

  const handleClickPrimaryBackground: ComponentProps<"button">["onClick"] =
    async (e) => {
      e.preventDefault();
      setIsClickedPrimaryBg(true);
    };

  const handleChangeProfileImage: ComponentProps<"input">["onChange"] = (e) => {
    setIsClickedPrimaryProfile(false);
    getBase64(e.target.files![0], "profile");
  };

  const handleChangeBackgroundImage: ComponentProps<"input">["onChange"] = (
    e
  ) => {
    setIsClickedPrimaryBg(false);
    getBase64(e.target.files![0], "background");
  };

  const getBase64 = (file: File, type: "background" | "profile") => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const imageUrl: string = reader.result as string;

      if (type === "background") return setBgImagePreview(imageUrl);

      return setProfileImagePreview(imageUrl);
    };
    reader.onerror = (error) => console.log("Error: ", error);
  };

  return (
    <form
      onSubmit={handleSubmitProfileEditForm}
      className="flex flex-col gap-y-4 items-center px-5 sm:text-xs sm:p-0"
    >
      <InputGroup
        label="닉네임 변경"
        type="text"
        name="nickname"
        errorText={errMsgs.nickname}
        wrapperClassName="w-full"
      />

      <InputGroup
        onChange={handleChangeProfileImage}
        wrapperClassName="flex flex-row gap-x-5 w-full items-center"
        label="프로필 사진 변경"
        type="file"
        name="profileImg"
      >
        {profileImagePreview ? (
          <Image
            width={150}
            height={150}
            className="w-12 h-12 self-end aspect-square rounded-full object-cover"
            alt="background image preview"
            src={profileImagePreview}
          />
        ) : isClickedPrimaryProfile ? (
          <Image
            width={150}
            height={150}
            className="w-12 h-12 self-end aspect-square rounded-full object-cover"
            alt="background image preview"
            src={DEFAULT_PROFILE_IMG}
          />
        ) : profileImage ? (
          <Image
            width={150}
            height={150}
            className="w-12 h-12 self-end aspect-square rounded-full object-cover"
            alt="background image preview"
            src={profileImage}
          />
        ) : (
          <div className="w-12 h-12 self-end aspect-square rounded-full bg-gray-400" />
        )}
      </InputGroup>

      <ButtonGroup
        onClick={handleClickPrimaryProfile}
        intent="default"
        textIntent="default"
        value="기본 이미지로 변경"
        className="sm:h-7 sm:px-0 sm:py-0 w-full sm:text-[12px] mt-3"
        wrapperClassName="w-full"
        size="md"
      />

      <InputGroup
        onChange={handleChangeBackgroundImage}
        label="배경 사진 변경"
        type="file"
        name="backgroundImg"
        wrapperClassName="w-full"
      >
        {bgImagePreview ? (
          <Image
            width={150}
            height={150}
            className="w-full h-14 object-cover mb-3 rounded-sm"
            alt="background image preview"
            src={bgImagePreview}
          />
        ) : isClickedPrimaryBg ? (
          <div className="w-full h-14 mb-3 bg-yellow-200 border border-gray-100" />
        ) : bgImage ? (
          <Image
            width={150}
            height={150}
            className="w-full object-cover mb-3 rounded-sm"
            alt="previous background image preview"
            src={bgImage}
          />
        ) : (
          <div className="w-full h-14 bg-gray-400 mb-3 rounded-sm" />
        )}
      </InputGroup>
      <ButtonGroup
        onClick={handleClickPrimaryBackground}
        intent="default"
        textIntent="default"
        value="기본 이미지로 변경"
        className="sm:h-7 sm:px-0 sm:py-0 w-full sm:text-[12px] mt-3"
        wrapperClassName="w-full"
        size="md"
      />

      <ButtonGroup
        intent="primary"
        textIntent="primary"
        value="수정하기"
        className="sm:h-7 sm:px-0 sm:py-0 w-full sm:text-[12px] mt-3"
        wrapperClassName="w-full"
        size="md"
      />
    </form>
  );
}

export default ProfileEditForm;
