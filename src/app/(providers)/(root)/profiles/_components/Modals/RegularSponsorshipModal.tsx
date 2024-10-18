"use client";
import RegularSponsorShip from "@/app/(providers)/(root)/profiles/_components/Modals/RegularSponsorShip";
import Modal from "@/components/Modal/Modal";
import { useModalStore } from "@/zustand/modal.store";

function RegularSponsorshipModal() {
  const activeModal = useModalStore((state) => state.activeModal);

  return (
    <>
      {activeModal && (
        <Modal isDim className="flex items-center justify-center z-[3]">
          <div className="fixed w-[450px] h-[400px] bg-white flex flex-col gap-y-8 justify-start items-center rounded-3xl">
            <RegularSponsorShip />
          </div>
        </Modal>
      )}
    </>
  );
}

export default RegularSponsorshipModal;
