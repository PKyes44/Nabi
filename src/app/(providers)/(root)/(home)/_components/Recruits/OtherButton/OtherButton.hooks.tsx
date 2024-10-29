import clientApi from "@/api/clientSide/api";
import { ToastType } from "@/types/toast.types";
import { useAuthStore } from "@/zustand/auth.store";
import { useToastStore } from "@/zustand/toast.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type OtherButtonHookProps = string;

function useOtherButton(recruitId: OtherButtonHookProps) {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.currentUser);
  const [isShownOthers, setIsShownOthers] = useState(false);
  const addToast = useToastStore((state) => state.addToast);

  const { mutate: deleteRecruit } = useMutation({
    mutationFn: () => clientApi.recruits.deleteRecruitByRecruitId(recruitId),
    onSuccess: () => {
      const toast: ToastType = {
        id: crypto.randomUUID(),
        title: "봉사자 구인공고 삭제 성공",
        content: "봉사자 구인공고 삭제를 성공하였습니다",
        type: "success",
      };
      addToast(toast);
      queryClient.invalidateQueries({
        queryKey: ["recruits", { page: "homepage" }],
      });
    },
    onError: () => {
      const toast: ToastType = {
        id: crypto.randomUUID(),
        title: "봉사자 구인공고 삭제 실패",
        content: "봉사자 구인공고 삭제를 실패하였습니다",
        type: "fail",
      };
      addToast(toast);
    },
  });

  const handleToggleOthers = () => {
    setIsShownOthers(!isShownOthers);
  };
  const handleClickDeleteRecruit = () => {
    deleteRecruit();
  };

  return {
    user,
    isShownOthers,
    handleToggleOthers,
    handleClickDeleteRecruit,
  };
}

export default useOtherButton;
