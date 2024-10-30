import Modal from "@/components/Modal/Modal";
import { useModalStore } from "@/zustand/modal.store";
import CreateFreeMealForm from "./CreateFreeMealForm";

function CreateFreeMealModal() {
  const activeModal = useModalStore((state) => state.activeModal);

  return (
    <>
      {activeModal && (
        <Modal className="flex items-center justify-center">
          <div className=" bg-white flex flex-col gap-y-8 justify-start items-center rounded-lg p-12">
            <CreateFreeMealForm />
          </div>
        </Modal>
      )}
    </>
  );
}

export default CreateFreeMealModal;
