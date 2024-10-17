"use client";

import Button from "@/components/Button/Button";
import { Tables } from "@/supabase/database.types";
import { useAuthStore } from "@/zustand/auth.store";
import { useModal } from "@/zustand/modal.store";
import { useRouter } from "next/navigation";
import ProfileEditModal from "./Modals/ProfileEditModal";
import RegularSponsorshipModal from "./Modals/RegularSponsorshipModal";

interface ProfileButtonsProps {
  showUserId: string;
  profile: Tables<"userProfiles">;
}

function ProfileButtons({ showUserId, profile }: ProfileButtonsProps) {
  const router = useRouter();
  const user = useAuthStore((state) => state.currentUser);
  const setActiveModal = useModal((state) => state.setActiveModal);

  const handleClickProfileEdit = () => {
    setActiveModal(<ProfileEditModal />);
  };

  const handleClickRegularSponsorShip = () => {
    setActiveModal(<RegularSponsorshipModal />);
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
