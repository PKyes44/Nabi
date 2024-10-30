import clientApi from "@/api/clientSide/api";
import { Tables, TablesInsert } from "@/supabase/database.types";
import { WithProfiles } from "@/types/profiles.types";
import { ToastType } from "@/types/toast.types";
import { useAuthStore } from "@/zustand/auth.store";
import { useToastStore } from "@/zustand/toast.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type ApplyToSponsorButtonProps = WithProfiles<Tables<"recruits">>;

function useApplyToSponsorButton(recruit: ApplyToSponsorButtonProps) {
  const queryClient = useQueryClient();
  const currentUser = useAuthStore((state) => state.currentUser);
  const userId = currentUser?.userId;
  const addToast = useToastStore((state) => state.addToast);

  const { data: approvedSponsors } = useQuery({
    queryKey: ["recruits", { recruit: "sponsor" }],
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
    TablesInsert<"sponsorMeets">
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

  const handleClickApplyButton = () => {
    const data = {
      recruitId: recruit.recruitId,
      userId,
      status: "pending",
    };

    insertSponsorMeet(data);
  };

  return {
    userId,
    userStatus,
    approvedSponsors,
    sponsorMeets,
    handleClickApplyButton,
  };
}

export default useApplyToSponsorButton;
