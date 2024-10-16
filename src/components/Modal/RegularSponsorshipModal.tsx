"use client";
import RegularSponsorShipPage from "@/app/(provider)/(root)/(loggedInOnly)/regular-sponsorship/page";
import { useRegularSponsorShipModalStore } from "@/zustand/modals/regularSponsorshipModal";
import { ComponentProps, PropsWithChildren } from "react";
import Modal from "./Modal";

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
          className="flex items-center justify-center"
          dim={false}
        >
          <div className="fixed w-[650px] h-[650px] bg-white flex flex-col gap-y-8 justify-start items-center rounded-3xl p-12">
            <RegularSponsorShipPage />
          </div>
        </Modal>
      )}
      {children}
    </>
  );
}

export default RegularSponsorshipModal;
