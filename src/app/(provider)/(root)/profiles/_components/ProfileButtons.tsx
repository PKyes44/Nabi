"use client";

import Button from "@/components/Button/Button";
import { Tables } from "@/supabase/database.types";
import { useAuthStore } from "@/zustand/auth.store";
import { useProfileEditModalStore } from "@/zustand/modals/profileEditModal.store";
import { useRegularSponsorShipModalStore } from "@/zustand/modals/regularSponsorshipModal";
import { useRouter } from "next/navigation";

interface ProfileButtonsProps {
  showUserId: string;
  profile: Tables<"userProfiles">;
}

function ProfileButtons({ showUserId, profile }: ProfileButtonsProps) {
  const router = useRouter();
  const user = useAuthStore((state) => state.currentUser);
  const setIsRegularSponsorShipModal = useRegularSponsorShipModalStore(
    (state) => state.setIsRegularSponsorShipModal
  );

  const setIsShowProfileEditModal = useProfileEditModalStore(
    (state) => state.setIsShowProfileEditModal
  );
  const handleClickProfileEdit = () => {
    setIsShowProfileEditModal(true);
  };

  const handleClickRegularSponsorShip = () => {
    setIsRegularSponsorShipModal(true);
  };

  const handleClickLinkToChat = () => {
    router.push(`/chats?showChatUserId=${showUserId}`);
  };
  return (
    <article className="self-center -mt-5 flex gap-x-3">
      {user?.userId === profile.userId ? (
        <Button
          intent="primary"
          textIntent="primary"
          className="px-5 py-1.5 rounded-sm text-base font-bold"
          onClick={handleClickProfileEdit}
        >
          프로필 수정
        </Button>
      ) : (
        <Button
          intent="primary"
          textIntent="primary"
          onClick={handleClickLinkToChat}
          className="px-5 py-1.5 rounded-sm text-base font-bold"
        >
          채팅하기
        </Button>
      )}
      {user?.role === "sponsor" && profile.role === "recipient" ? (
        <Button
          intent="primary"
          textIntent="primary"
          onClick={handleClickRegularSponsorShip}
          className="px-5 py-1.5 rounded-sm text-base font-bold"
        >
          정기 후원
        </Button>
      ) : null}
    </article>
  );
}

export default ProfileButtons;
