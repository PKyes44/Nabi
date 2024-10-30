import Modal from "@/components/Modal/Modal";
import { useModalStore } from "@/zustand/modal.store";
import { useRouter } from "next/navigation";
import { FaChildren } from "react-icons/fa6";
import { MdVolunteerActivism } from "react-icons/md";

function SelectRoleModal() {
  const router = useRouter();
  const { activeModal, setActiveModal } = useModalStore();

  const handleClickSelectRole = (role: "recipient" | "sponsor") => {
    const href = `/sign-up?role=${role}`;
    router.push(href);
    setActiveModal(null);
  };

  return (
    <>
      {activeModal && (
        <Modal className="flex gap-x-10 items-center justify-center">
          <button
            onClick={() => handleClickSelectRole("recipient")}
            className="w-72 aspect-square bg-white border border-gray-500 rounded-xl p-5 pt-10 pb-2 sm:w-28 sm:pt-2"
          >
            <article className="flex flex-col justify-between gap-y-8 sm:gap-y-0">
              <div className="w-44 h-32 m-auto rounded-lg grid place-content-center sm:w-20 sm:h-16">
                <FaChildren className="sm:w-14" size={80} color="#555555" />
              </div>
              <span className="text-center font-extrabold text-2xl text-gray-600 sm:text-lg">
                후원아동
              </span>
            </article>
          </button>

          <button
            onClick={() => handleClickSelectRole("sponsor")}
            className="w-72 aspect-square bg-white border border-gray-500 rounded-xl p-5 pt-10 pb-2 sm:w-28 sm:pt-2"
          >
            <article className="flex flex-col justify-between gap-y-8 sm:gap-y-0">
              <div className="w-44 h-32 m-auto rounded-lg grid place-content-center sm:w-20 sm:h-16">
                <MdVolunteerActivism
                  className="sm:w-14"
                  size={80}
                  color="#555555"
                />
              </div>
              <span className="text-center font-extrabold text-2xl text-gray-600 sm:text-lg">
                후원자
              </span>
            </article>
          </button>
        </Modal>
      )}
    </>
  );
}

export default SelectRoleModal;
