"use client";
import ProfileEditForm from "@/app/(providers)/(root)/profiles/_components/ProfileEditForm";
import Modal from "@/components/Modal/Modal";
import { useModalStore } from "@/zustand/modal.store";

function ProfileEditModal() {
  const activeModal = useModalStore((state) => state.activeModal);

  return (
    <>
      {activeModal && (
        <Modal className="flex items-center justify-center">
          <div className="w-[550px] h-[650px] bg-white flex flex-col gap-y-8 justify-start items-center rounded-lg p-12">
            <h1 className="text-2xl font-bold">프로필 수정</h1>

            <ProfileEditForm />
          </div>
        </Modal>
      )}
    </>
  );
}

export default ProfileEditModal;
