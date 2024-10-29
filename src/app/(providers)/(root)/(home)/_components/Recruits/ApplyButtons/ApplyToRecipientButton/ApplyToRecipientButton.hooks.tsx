import clientApi from "@/api/clientSide/api";
import { Database, Tables } from "@/supabase/database.types";
import { WithProfiles } from "@/types/profiles.types";
import { ToastType } from "@/types/toast.types";
import { useAuthStore } from "@/zustand/auth.store";
import { useToastStore } from "@/zustand/toast.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type ApplyToRecipientButtonHookProps = WithProfiles<Tables<"recruits">>;

function useApplyRecipientButton(recruit: ApplyToRecipientButtonHookProps) {
  const queryClient = useQueryClient();
  const currentUser = useAuthStore((state) => state.currentUser);
  const userId = currentUser?.userId;
  const addToast = useToastStore((state) => state.addToast);

  const { data: approvedRecipients } = useQuery({
    queryKey: ["recruits", { recruitId: "recipients" }],
    queryFn: () =>
      clientApi.recipientMeets.getRecipientByRecruitId(recruit.recruitId),
  });

  const { data: recipientMeets } = useQuery({
    queryKey: ["recipientMeets"],
    queryFn: () => clientApi.recipientMeets.getRecipientMeets(),
  });

  const { mutate: insertRecipientMeet } = useMutation<
    unknown,
    Error,
    Database["public"]["Tables"]["recipientMeets"]["Insert"]
  >({
    mutationFn: (data) => clientApi.recipientMeets.insertRecipientMeet(data),
    onSuccess: () => {
      const toast: ToastType = {
        id: crypto.randomUUID(),
        title: "봉사자 신청 성공",
        content: "봉사자 신청에 성공하였습니다",
        type: "success",
      };
      addToast(toast);
      queryClient.invalidateQueries({ queryKey: ["recipientMeets"] });
    },
    onError: () => {
      const toast: ToastType = {
        id: crypto.randomUUID(),
        title: "봉사자 신청 실패",
        content: "봉사자 신청에 실패하였습니다",
        type: "fail",
      };
      addToast(toast);
    },
  });

  const userStatus = recipientMeets?.find(
    (recipientMeet) =>
      recipientMeet.recruitId === recruit.recruitId &&
      recipientMeet.userId === userId
  );

  const handleClickApplyButton = () => {
    const data = {
      recruitId: recruit.recruitId,
      userId,
      status: "pending",
    };

    insertRecipientMeet(data);
  };

  return {
    userId,
    userStatus,
    recipientMeets,
    approvedRecipients,
    handleClickApplyButton,
  };
}

export default useApplyRecipientButton;
