"use client";
import Button from "@/components/Button/Button";
import { useProfileEditModalStore } from "@/zustand/modals/profileEditModal.store";

function ProfileEditButton() {
  const setIsShowProfileEditModal = useProfileEditModalStore(
    (state) => state.setIsShowProfileEditModal
  );

  const handleClickProfileEdit = () => {
    setIsShowProfileEditModal(true);
  };

  return (
    <Button
      intent="primary"
      textIntent="primary"
      className="px-5 py-1.5 rounded-sm text-base font-bold"
      onClick={handleClickProfileEdit}
    >
      프로필 수정
    </Button>
  );
}

export default ProfileEditButton;
