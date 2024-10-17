"use client";

import { supabase } from "@/supabase/client";
import { useModal } from "@/zustand/modal.store";
import { PropsWithChildren } from "react";
import Modal from "../../../../../components/Modal/Modal";

function LogOutModal({ children }: PropsWithChildren) {
  const { activeModal, setActiveModal } = useModal();

  const handleClickLogOut = async () => {
    await supabase.auth.signOut();
    setActiveModal(null);
  };
  return (
    <>
      {activeModal && (
        <Modal isDim={false} className="!z-0">
          <div className="bg-white absolute right-[8.5rem] top-[4.5rem] px-5 py-3 shadow-lg rounded-lg text-sm">
            <button onClick={handleClickLogOut}>로그아웃하기</button>
          </div>
        </Modal>
      )}
      {children}
    </>
  );
}

export default LogOutModal;
