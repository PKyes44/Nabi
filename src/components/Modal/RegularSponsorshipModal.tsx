"use client";
import { useRegularSponsorShipModalStore } from "@/zustand/modals/regularSponsorshipModal.store";
import { ComponentProps, PropsWithChildren } from "react";
import Modal from "./Modal";
import RegularSponsorShip from "./components/RegularSponsorShip";

function RegularSponsorshipModal({ children }: PropsWithChildren) {
  const { isShowRegularSponsorShipModal, setIsRegularSponsorShipModal } =
    useRegularSponsorShipModalStore();

  // 모달 백드랍 클릭 시 모달 닫기
  const handleClickOutOfRange: ComponentProps<"div">["onClick"] = (e) => {
    if (e.target === e.currentTarget) {
      setIsRegularSponsorShipModal(false);
    }
  };

  return (
    <>
      {isShowRegularSponsorShipModal && (
        <Modal
          onClickFn={handleClickOutOfRange}
          className="flex items-center justify-center z-[2]"
        >
          <div className="fixed w-[650px] h-[650px] bg-white flex flex-col gap-y-8 justify-start items-center rounded-3xl p-12">
            <RegularSponsorShip />
          </div>
        </Modal>
      )}
      {children}
    </>
  );
}

export default RegularSponsorshipModal;
