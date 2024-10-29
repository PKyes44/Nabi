import clientApi from "@/api/clientSide/api";
import ButtonGroup from "@/components/Button/ButtonGroup";
import { Database, Tables } from "@/supabase/database.types";
import { ToastType } from "@/types/toast.types";
import { useAuthStore } from "@/zustand/auth.store";
import { useToastStore } from "@/zustand/toast.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ApplyButtonSkeleton from "./components/ApplyButtonSkeleton";

interface ApplyToSponsorButtonProps {
  recruit: WithProfiles<Tables<"recruits">>;
  authorId: string;
}

function ApplyToSponsorButton({
  recruit,
  authorId,
}: ApplyToSponsorButtonProps) {
  const queryClient = useQueryClient();
  const currentUser = useAuthStore((state) => state.currentUser);
  const userId = currentUser?.userId;
  const addToast = useToastStore((state) => state.addToast);

  const { data: approvedSponsors } = useQuery({
    queryKey: ["recruits", { recruitId: "recipients" }],
    queryFn: () =>
      clientApi.sponsorMeets.getApprovedSponsorsByRecruitId(recruit.recruitId),
  });

  const { data: sponsorMeets } = useQuery({
    queryKey: ["sponsorMeets"],
    queryFn: () => clientApi.sponsorMeets.getSponsorMeets(),
  });

  const { mutate: insertSponsorMeet } = useMutation<
    unknown,
    Error,
    Database["public"]["Tables"]["sponsorMeets"]["Insert"]
  >({
    mutationFn: (data) => clientApi.sponsorMeets.insertSponsorMeet(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sponsorMeets"] });
      const toast: ToastType = {
        title: "신청 성공",
        content: "작성자가 승인을 하면 신청이 완료됩니다",
        id: crypto.randomUUID(),
        type: "success",
      };
      addToast(toast);
    },
    onError: (e) => {
      alert(e.message);
    },
  });

  const userStatus = sponsorMeets?.find(
    (sponsorMeet) =>
      sponsorMeet.recruitId === recruit.recruitId &&
      sponsorMeet.userId === userId
  );

  if (!userId) return null;
  if (!sponsorMeets) return <ApplyButtonSkeleton />;

  const handleClickApplyButton = () => {
    const data = {
      recruitId: recruit.recruitId,
      userId,
      status: "pending",
    };

    insertSponsorMeet(data);
  };

  return recruit?.maxSponsorRecruits! <= approvedSponsors?.length! ? (
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
      value="신청하기"
    />
  );
}

export default ApplyToSponsorButton;
