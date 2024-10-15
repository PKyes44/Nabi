"use client";
import ProfileEditForm from "@/app/(provider)/(root)/(loggedInOnly)/profiles/_components/ProfileEditForm";
import { useProfileEditModalStore } from "@/zustand/profileEditModal.store";
import { ComponentProps, PropsWithChildren } from "react";
import Modal from "./Modal";

function ProfileEditModal({ children }: PropsWithChildren) {
  const { isShowProfileEditModal, setIsShowProfileEditModal } =
    useProfileEditModalStore();

  // 모달 백드랍 클릭 시 모달 닫기
  const handleClickOutOfRange: ComponentProps<"div">["onClick"] = (e) => {
    if (e.target === e.currentTarget) {
      setIsShowProfileEditModal(false);
    }
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

            <ProfileEditForm />
          </div>
        </Modal>
      )}
      {children}
    </>
  );
}

export default ProfileEditModal;
