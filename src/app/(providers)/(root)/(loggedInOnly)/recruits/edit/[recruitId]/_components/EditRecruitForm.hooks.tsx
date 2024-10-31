import clientApi from "@/api/clientSide/api";
import { Database } from "@/supabase/database.types";
import { CustomFormEvent } from "@/types/formEvent.types";
import { ToastType } from "@/types/toast.types";
import { useAuthStore } from "@/zustand/auth.store";
import { useToastStore } from "@/zustand/toast.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { ComponentProps, useState } from "react";

interface InitialErrMsgs {
  maxSponsorRecruits: string | null;
  maxRecipientRecruits: string | null;
  region: string | null;
  title: string | null;
  deadLineDate: string | null;
  volunteeringDate: string | null;
  content: string | null;
}

const initialErrMsgs = {
  maxSponsorRecruits: null,
  maxRecipientRecruits: null,
  region: null,
  title: null,
  deadLineDate: null,
  volunteeringDate: null,
  content: null,
};

interface EditRecruitForm {
  maxSponsorRecruits: HTMLInputElement;
  maxRecipientRecruits: HTMLInputElement;
  deadLineDate: HTMLInputElement;
  volunteeringDate: HTMLInputElement;
  region: HTMLInputElement;
  title: HTMLInputElement;
  content: HTMLTextAreaElement;
}

type EditRecruitFormEvent = CustomFormEvent<EditRecruitForm>;

function useEditRecruitForm(recruitId: string) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [errMsgs, setErrMsgs] = useState<InitialErrMsgs>(initialErrMsgs);
  const author = useAuthStore((state) => state.currentUser);
  const today = dayjs().format("YYYY-MM-DD");
  const addToast = useToastStore((state) => state.addToast);

  const { data: recruit, isLoading } = useQuery({
    queryKey: ["recruits", { recruitId }],
    queryFn: () => clientApi.recruits.getRecruit(recruitId),
  });

  const { mutate: editRecruit } = useMutation<
    unknown,
    Error,
    Database["public"]["Tables"]["recruits"]["Update"]
  >({
    mutationFn: (data) => clientApi.recruits.editRecruit(recruitId, data),
    onSuccess: () => {
      const id = crypto.randomUUID();
      const title = "봉사활동 구인글 수정 성공";
      const content =
        "봉사활동 구인글 수정을 완료하였습니다\n홈페이지로 이동됩니다";
      const type = "success";
      const toast: ToastType = {
        id,
        title,
        content,
        type,
      };
      addToast(toast);
      queryClient.invalidateQueries({
        queryKey: ["recruits"],
      });
      router.push("/");
    },
    onError: (e) => {
      alert(e.message);
    },
  });

  const throwErrMsgs = (type: string, message: string) => {
    setErrMsgs((prevErrMsgs) => ({ ...prevErrMsgs, [type]: message }));
  };

  const handleSubmitRecruitEditForm: ComponentProps<"form">["onSubmit"] =
    async (e: EditRecruitFormEvent) => {
      e.preventDefault();

      if (!author?.userId) return;

      const maxSponsorRecruits = +e.target.maxSponsorRecruits.value;
      const maxRecipientRecruits = +e.target.maxRecipientRecruits.value;
      const deadLineDateValue = e.target.deadLineDate.value;
      const volunteeringDateValue = e.target.volunteeringDate.value;
      const region = e.target.region.value;
      const title = e.target.title.value;
      const content = e.target.content.value;
      const isEnd = false;

      const nonFormatDeadLineDate = dayjs(deadLineDateValue);
      const nonFormatVolunteeringDate = dayjs(volunteeringDateValue);

      setErrMsgs(initialErrMsgs);

      if (isNaN(maxSponsorRecruits) || maxSponsorRecruits <= 0) {
        return throwErrMsgs(
          "maxSponsorRecruits",
          "모집 인원은 1 이상의 숫자로만 작성해주세요"
        );
      }
      if (isNaN(maxRecipientRecruits) || maxRecipientRecruits <= 0) {
        return throwErrMsgs(
          "maxRecipientRecruits",
          "모집 인원은 1 이상의 숫자로만 작성해주세요"
        );
      }

      if (!deadLineDateValue) {
        return throwErrMsgs("deadLineDate", "모집 마감 날짜를 선택해주세요.");
      }
      if (!volunteeringDateValue) {
        return throwErrMsgs(
          "volunteeringDate",
          "자원 봉사 날짜를 선택해주세요."
        );
      }

      if (nonFormatVolunteeringDate.isBefore(nonFormatDeadLineDate)) {
        return throwErrMsgs(
          "volunteeringDate",
          "자원 봉사 날짜는 모집 마감 날짜 이후여야 합니다."
        );
      }
      if (!region) return throwErrMsgs("region", "지역을 입력해주세요");
      if (!title) return throwErrMsgs("title", "제목을 입력해주세요");
      if (!content) return throwErrMsgs("content", "내용을 작성해주세요");

      const deadLineDate = nonFormatDeadLineDate.format("YYYY-MM-DD HH:mm");
      const volunteeringDate =
        nonFormatVolunteeringDate.format("YYYY-MM-DD HH:mm");

      const recruitEditData: Database["public"]["Tables"]["recruits"]["Insert"] =
        {
          maxSponsorRecruits,
          maxRecipientRecruits,
          deadLineDate,
          volunteeringDate,
          region,
          title,
          content,
          isEnd,
          authorId: author.userId,
        };

      editRecruit(recruitEditData);
    };

  return {
    isLoading,
    recruit,
    errMsgs,
    today,
    handleSubmitRecruitEditForm,
  };
}

export default useEditRecruitForm;
