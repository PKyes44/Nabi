import clientApi from "@/api/clientSide/api";
import { Database } from "@/supabase/database.types";
import { useAuthStore } from "@/zustand/auth.store";
import useStoreDetailStore from "@/zustand/storeDetailModal.store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ComponentProps, PropsWithChildren } from "react";
import Button from "../Button/Button";
import Modal from "./Modal";

function StoreDetailModal({ children }: PropsWithChildren) {
  const isShowStoreDetailModal = useStoreDetailStore(
    (state) => state.isShowStoreDetailModal
  );
  const setIsShowStoreDetailModal = useStoreDetailStore(
    (state) => state.setIsShowStoreDetailModal
  );
  const storeDetailData = useStoreDetailStore((state) => state.storeDetailData);
  const currentUserId = useAuthStore((state) => state.currentUserId);

  const { data: isStoreOwner } = useQuery({
    queryKey: [
      "storeOwners",
      { userId: currentUserId, storeId: storeDetailData?.storeId },
    ],
    queryFn: () =>
      clientApi.storeOwners.isStoreOwnerByStoreIdAndUserId({
        userId: currentUserId!,
        storeId: storeDetailData!.storeId,
      }),
  });
  const { mutate: insertOwner } = useMutation({
    mutationFn: (
      insertStoreOwner: Database["public"]["Tables"]["storeOwners"]["Insert"]
    ) => clientApi.storeOwners.insertStoreOwner(insertStoreOwner),
  });

  const handleClickOutOfRange: ComponentProps<"div">["onClick"] = (e) => {
    if (e.target === e.currentTarget) {
      setIsShowStoreDetailModal(false);
    }
  };
  const handleClickRegistOwner = () => {
    if (!storeDetailData || !currentUserId) return;
    const insertOwnerData: Database["public"]["Tables"]["storeOwners"]["Insert"] =
      {
        storeId: storeDetailData.storeId,
        sponsorId: currentUserId,
      };
    insertOwner(insertOwnerData);
  };

  return (
    <>
      {isShowStoreDetailModal && (
        <Modal
          onClickFn={handleClickOutOfRange}
          className="grid place-content-center"
        >
          <section className="w-96 h-96 bg-white rounded-lg py-8 px-10 flex flex-col gap-y-5">
            <div className="bg-gray-400 w-full h-40" />
            <div className="flex flex-col gap-y-5">
              <div>
                <h2 className="font-bold text-2xl">
                  {storeDetailData?.brandName}
                </h2>
                <span className="text-sm">{storeDetailData?.storeType}</span>
                <address className="not-italic text-sm">
                  {storeDetailData?.address}
                </address>
              </div>
              <Button
                onClick={handleClickRegistOwner}
                size="md"
                rounded="lg"
                className="px-5 py-1.5"
                intent="primary"
                textIntent="primary"
              >
                점주 등록하기
              </Button>
            </div>
          </section>
        </Modal>
      )}
      {children}
    </>
  );
}

export default StoreDetailModal;
