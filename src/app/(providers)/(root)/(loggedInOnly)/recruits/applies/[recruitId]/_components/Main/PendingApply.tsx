"use client";

import clientApi from "@/api/clientSide/api";
import Button from "@/components/Button/Button";
import ProfileItem from "@/components/ProfileItem/ProfileItem";
import { Tables } from "@/supabase/database.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface PendingApplyProps {
  userProfile: Tables<"userProfiles">;
  recruitId: string;
}

function PendingApply({ userProfile, recruitId }: PendingApplyProps) {
  const queryClient = useQueryClient();
  const { mutate: approveUser } = useMutation({
    mutationFn: () => {
      if (userProfile.role === "sponsor")
        return clientApi.sponsorMeets.approveSponsor(
          userProfile.userId,
          recruitId
        );
      return clientApi.recipientMeets.approveRecipient(
        userProfile.userId,
        recruitId
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sponsorMeets", { status: "approved" }],
      });
      queryClient.invalidateQueries({
        queryKey: ["recipientMeets", { status: "approved" }],
      });
      queryClient.invalidateQueries({
        queryKey: ["recipientMeets", { status: "pending" }],
      });
      queryClient.invalidateQueries({
        queryKey: ["sponsorMeets", { status: "pending" }],
      });
    },
  });
  const { mutate: rejectUser } = useMutation({
    mutationFn: () => {
      if (userProfile.role === "sponsor")
        return clientApi.sponsorMeets.rejectSponsor(
          userProfile.userId,
          recruitId
        );
      return clientApi.recipientMeets.rejectRecipient(
        userProfile.userId,
        recruitId
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sponsorMeets", { status: "rejected" }],
      });
      queryClient.invalidateQueries({
        queryKey: ["recipientMeets", { status: "rejected" }],
      });
      queryClient.invalidateQueries({
        queryKey: ["recipientMeets", { status: "pending" }],
      });
      queryClient.invalidateQueries({
        queryKey: ["sponsorMeets", { status: "pending" }],
      });
    },
  });

  const handleApproveUser = () => approveUser();

  const handleRejectUser = () => rejectUser();

  return (
    <>
      <ProfileItem
        className="flex-1"
        nickname={userProfile.nickname}
        profileImageUrl={userProfile.profileImageUrl}
        userId={userProfile.userId}
      />
      <Button
        onClick={handleApproveUser}
        className="w-16 !p-0 sm:text-[8px] sm:w-5"
        intent="green"
        textIntent="green"
      >
        승인
      </Button>
      <Button
        onClick={handleRejectUser}
        className="w-16 !p-0 sm:text-[8px] sm:w-5"
        size="sm"
        intent="red"
        textIntent="red"
      >
        거절
      </Button>
    </>
  );
}

export default PendingApply;
