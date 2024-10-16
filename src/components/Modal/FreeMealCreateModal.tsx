import { useFreeMealCreateModalStore } from "@/zustand/modals/freeMealCreateModal.store";
import { ComponentProps, PropsWithChildren } from "react";
import Modal from "./Modal";
import CreateFreeMealForm from "./components/CreateFreeMealForm";

function FreeMealCreateModal({ children }: PropsWithChildren) {
  const { isShowFreeMealCreateModal, setIsFreeMealCreateModal } =
    useFreeMealCreateModalStore();

  const handleClickOutOfRange: ComponentProps<"div">["onClick"] = (e) => {
    if (e.target === e.currentTarget) {
      setIsFreeMealCreateModal(false);
    }
  };

  return (
    <>
      {isShowFreeMealCreateModal && (
        <Modal
          onClickFn={handleClickOutOfRange}
          className="flex items-center justify-center"
        >
          <div className=" bg-white flex flex-col gap-y-8 justify-start items-center rounded-lg p-12">
            <CreateFreeMealForm />
          </div>
        </Modal>
      )}
      {children}
    </>
  );
}

export default FreeMealCreateModal;
