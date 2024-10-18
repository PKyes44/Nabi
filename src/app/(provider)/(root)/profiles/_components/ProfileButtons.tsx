"use client";

import clientApi from "@/api/clientSide/api";
import Button from "@/components/Button/Button";
import { Tables } from "@/supabase/database.types";
import { useAuthStore } from "@/zustand/auth.store";
import { useProfileEditModalStore } from "@/zustand/modals/profileEditModal.store";
import { useRegularSponsorShipModalStore } from "@/zustand/modals/regularSponsorshipModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface ProfileButtonsProps {
  showUserId: string;
  profile: Tables<"userProfiles">;
}

function ProfileButtons({ showUserId, profile }: ProfileButtonsProps) {
  const router = useRouter();
  const currentUserId = useAuthStore((state) => state.currentUserId);
  const roleType = useAuthStore((state) => state.roleType);
  const queryClient = useQueryClient();

  const { data: myRegularSponsorships } = useQuery({
    queryKey: ["regularSponsorship", { currentUserId }],
    queryFn: () => {
      return clientApi.sponsorShip.getMyRegularSponsorships(currentUserId!);
    },
    enabled: roleType === "sponsor",
  });

  const { mutate: stopRegularSponsorShip } = useMutation({
    mutationFn: () =>
      clientApi.sponsorShip.stopRegularSponsorship(currentUserId!, showUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["regularSponsorship", { currentUserId }],
      });
    },
  });

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

  const handleClickStopRegularSponsorship = () => {
    stopRegularSponsorShip();
  };

  return (
    <article className="self-center -mt-5 flex gap-x-3">
      {currentUserId === profile.userId ? (
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
      {roleType === "sponsor" &&
        profile.role === "recipient" &&
        (myRegularSponsorships?.some(
          (regularSponsorship) => regularSponsorship.recipientId === showUserId
        ) ? (
          <Button
            intent="primary"
            textIntent="black"
            className="px-5 py-1.5 rounded-sm text-base font-bold"
            onClick={handleClickStopRegularSponsorship}
          >
            후원 끊기
          </Button>
        ) : (
          <Button
            intent="primary"
            textIntent="primary"
            onClick={handleClickRegularSponsorShip}
            className="px-5 py-1.5 rounded-sm text-base font-bold"
          >
            정기 후원
          </Button>
        ))}
    </article>
  );
}

export default ProfileButtons;
