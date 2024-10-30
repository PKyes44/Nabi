"use client";

import Modal from "@/components/Modal/Modal";
import { useModalStore } from "@/zustand/modal.store";
import ProfileEditForm from "../ProfileEditForm";

interface ProfileEditModalProps {
  profileImage: string | null;
  bgImage: string | null;
}

function ProfileEditModal({ profileImage, bgImage }: ProfileEditModalProps) {
  const activeModal = useModalStore((state) => state.activeModal);

  return (
    <>
      {activeModal && (
        <Modal className="flex items-center justify-center">
          <div className="w-[550px] h-[650px] sm:w-[300px] bg-white flex flex-col gap-y-8 justify-start items-center rounded-lg p-12 pt-9">
            <h1 className="text-2xl font-bold">프로필 수정</h1>

            <ProfileEditForm profileImage={profileImage} bgImage={bgImage} />
          </div>
        </Modal>
      )}
    </>
  );
}

export default ProfileEditModal;
