"use client";

import { supabase } from "@/supabase/client";
import { useLogOutModal } from "@/zustand/logOutModal.store";
import { ComponentProps, PropsWithChildren } from "react";
import Modal from "./Modal";

function LogOutModal({ children }: PropsWithChildren) {
  const { isShowLogOutModal, setIsShowLogOutModal } = useLogOutModal();

  // 모달 백드랍 클릭 시 모달 닫기
  const handleClickOutOfRange: ComponentProps<"div">["onClick"] = (e) => {
    if (e.target === e.currentTarget) {
      setIsShowLogOutModal(false);
    }
  };

  const handleClickLogOut = async () => {
    await supabase.auth.signOut();
    setIsShowLogOutModal(false);
  };
  return (
    <>
      {isShowLogOutModal && (
        <Modal isDim={false} onClickFn={handleClickOutOfRange} className="!z-0">
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
