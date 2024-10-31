import ButtonGroup from "@/components/Button/ButtonGroup";
import { Tables } from "@/supabase/database.types";
import { WithProfiles } from "@/types/profiles.types";
import ApplyButtonSkeleton from "../../Skeleton/ApplyButtonSkeleton";
import useApplyToSponsorButton from "./ApplyToSponsorButton.hooks";

interface ApplyToSponsorButtonProps {
  recruit: WithProfiles<Tables<"recruits">>;
  authorId: string;
}

function ApplyToSponsorButton({
  recruit,
  authorId,
}: ApplyToSponsorButtonProps) {
  const {
    userId,
    userStatus,
    sponsorMeets,
    approvedSponsors,
    handleClickApplyButton,
  } = useApplyToSponsorButton(recruit);

  if (!userId) return null;
  if (!sponsorMeets) return <ApplyButtonSkeleton />;

  return recruit?.maxSponsorRecruits! <= approvedSponsors?.length! ? (
    <ButtonGroup
      intent="red"
      textIntent="red"
      value="모집 마감"
      className="ml-auto sm:text-xs"
      disabled
    />
  ) : userId !== authorId && userStatus ? (
    userStatus.status === "pending" ? (
      <ButtonGroup
        intent="disabled"
        textIntent="disabled"
        value="승인 대기 중"
        className="ml-auto sm:text-xs"
        disabled
      />
    ) : userStatus.status === "approved" ? (
      <ButtonGroup
        intent="green"
        textIntent="green"
        value="승인됨"
        className="ml-auto sm:text-xs"
        disabled
      />
    ) : userStatus.status === "rejected" ? (
      <ButtonGroup
        intent="red"
        textIntent="red"
        value="거절됨"
        className="ml-auto sm:text-xs"
        disabled
      />
    ) : null
  ) : (
    <ButtonGroup
      onClick={handleClickApplyButton}
      intent="primary"
      textIntent="primary"
      className="ml-auto sm:text-xs"
      value="신청하기"
    />
  );
}

export default ApplyToSponsorButton;
