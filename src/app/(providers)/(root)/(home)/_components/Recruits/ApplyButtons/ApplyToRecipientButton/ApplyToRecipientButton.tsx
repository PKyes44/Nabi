"use client";
import ButtonGroup from "@/components/Button/ButtonGroup";
import { Tables } from "@/supabase/database.types";
import { WithProfiles } from "@/types/profiles.types";
import ApplyButtonSkeleton from "../../Skeleton/ApplyButtonSkeleton";
import useApplyRecipientButton from "./ApplyToRecipientButton.hooks";

interface ApplyToRecipientButtonProps {
  recruit: WithProfiles<Tables<"recruits">>;
  authorId: string;
}

function ApplyToRecipientButton({
  recruit,
  authorId,
}: ApplyToRecipientButtonProps) {
  const {
    userId,
    userStatus,
    recipientMeets,
    approvedRecipients,
    handleClickApplyButton,
  } = useApplyRecipientButton(recruit);

  if (!userId) return null;
  if (!recipientMeets) return <ApplyButtonSkeleton />;
  return recruit?.maxRecipientRecruits! <= approvedRecipients?.length! ? (
    <ButtonGroup
      intent="red"
      textIntent="red"
      value="모집 마감"
      className="ml-auto"
      disabled
    />
  ) : userId !== authorId && userStatus ? (
    userStatus.status === "pending" ? (
      <ButtonGroup
        intent="disabled"
        textIntent="disabled"
        value="승인 대기 중"
        className="ml-auto"
        disabled
      />
    ) : userStatus.status === "approved" ? (
      <ButtonGroup
        intent="green"
        textIntent="green"
        value="승인됨"
        className="ml-auto"
        disabled
      />
    ) : userStatus.status === "rejected" ? (
      <ButtonGroup
        intent="red"
        textIntent="red"
        value="거절됨"
        className="ml-auto"
        disabled
      />
    ) : null
  ) : (
    <ButtonGroup
      onClick={handleClickApplyButton}
      intent="primary"
      textIntent="primary"
      className="ml-auto"
      value="후원 신청"
    />
  );
}

export default ApplyToRecipientButton;
