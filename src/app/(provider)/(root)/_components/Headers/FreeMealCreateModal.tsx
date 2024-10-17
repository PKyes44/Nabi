import { useModal } from "@/zustand/modal.store";
import Modal from "../../../../../components/Modal/Modal";
import CreateFreeMealForm from "../../(home)/_components/FreeMeals/CreateFreeMealForm";

function FreeMealCreateModal() {
  const activeModal = useModal((state) => state.activeModal);

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

export default FreeMealCreateModal;
