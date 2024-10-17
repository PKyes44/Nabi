"use client";
import RegularSponsorShip from "@/components/Modal/components/RegularSponsorShip";
import Modal from "@/components/Modal/Modal";
import { useModal } from "@/zustand/modal.store";

function RegularSponsorshipModal() {
  const activeModal = useModal((state) => state.activeModal);

  return (
    <>
      {activeModal && (
        <Modal isDim className="flex items-center justify-center z-[3]">
          <div className="fixed w-[650px] h-[650px] bg-white flex flex-col gap-y-8 justify-start items-center rounded-3xl p-12">
            <RegularSponsorShip />
          </div>
        </Modal>
      )}
    </>
  );
}

export default RegularSponsorshipModal;
