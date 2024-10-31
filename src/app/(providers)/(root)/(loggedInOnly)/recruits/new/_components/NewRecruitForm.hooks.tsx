"use client";

import { TablesInsert } from "@/supabase/database.types";

import clientApi from "@/api/clientSide/api";
import { CustomFormEvent } from "@/types/formEvent.types";
import { ToastType } from "@/types/toast.types";
import { useAuthStore } from "@/zustand/auth.store";
import { useToastStore } from "@/zustand/toast.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

interface NewRecruitForm {
  maxSponsorRecruits: HTMLInputElement;
  maxRecipientRecruits: HTMLInputElement;
  deadLineDate: HTMLInputElement;
  volunteeringDate: HTMLInputElement;
  region: HTMLInputElement;
  title: HTMLInputElement;
  content: HTMLTextAreaElement;
}

type NewRecruitFormEvent = CustomFormEvent<NewRecruitForm>;

function useNewRecruitForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [errMsgs, setErrMsgs] = useState<InitialErrMsgs>(initialErrMsgs);
  const author = useAuthStore((state) => state.currentUser);
  const today = dayjs().format("YYYY-MM-DD");
  const userId = author?.userId;
  const addToast = useToastStore((state) => state.addToast);

  const { mutate: createRecruit } = useMutation<
    { recruitId: string },
    Error,
    TablesInsert<"recruits">
  >({
    mutationFn: (data) => clientApi.recruits.createRecruit(data),
    onSuccess: (newRecruit) => {
      const sponsorMeetData = {
        recruitId: newRecruit.recruitId,
        userId: userId,
        status: "approved",
      };

      insertSponsorMeet(sponsorMeetData);
      const toast: ToastType = {
        id: crypto.randomUUID(),
        title: "봉사자 구인 글 작성 완료",
        content: "봉사자 구인 글 작성을 완료했습니다\n홈페이지로 이동합니다",
        type: "success",
      };
      addToast(toast);
      router.push(`/`);
      queryClient.invalidateQueries({
        queryKey: ["recruits"],
        exact: true,
      });
    },
    onError: () => {
      const toast: ToastType = {
        id: crypto.randomUUID(),
        title: "봉사자 구인 글 작성 실패",
        content: "봉사자 구인 글 작성을 실패했습니다",
        type: "fail",
      };
      addToast(toast);
    },
  });

  const { mutate: insertSponsorMeet } = useMutation<
    unknown,
    Error,
    TablesInsert<"sponsorMeets">
  >({
    mutationFn: (data) => clientApi.sponsorMeets.insertSponsorMeet(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sponsorMeets"] });

      queryClient.invalidateQueries({
        queryKey: ["recruits"],
      });
    },
    onError: (e) => {
      alert(e.message);
    },
  });

  const throwErrMsgs = (type: string, message: string) => {
    setErrMsgs((prevErrMsgs) => ({ ...prevErrMsgs, [type]: message }));
  };

  const handleSubmitRecruitForm: ComponentProps<"form">["onSubmit"] = async (
    e: NewRecruitFormEvent
  ) => {
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

    if (!title) return throwErrMsgs("title", "제목을 입력해주세요");
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
      return throwErrMsgs("volunteeringDate", "자원 봉사 날짜를 선택해주세요.");
    }

    if (nonFormatVolunteeringDate.isBefore(nonFormatDeadLineDate)) {
      return throwErrMsgs(
        "volunteeringDate",
        "자원 봉사 날짜는 모집 마감 날짜 이후여야 합니다."
      );
    }
    if (!region) return throwErrMsgs("region", "지역을 입력해주세요");
    if (!content) return throwErrMsgs("content", "내용을 작성해주세요");

    const deadLineDate = nonFormatDeadLineDate.format("YYYY-MM-DD HH:mm");
    const volunteeringDate =
      nonFormatVolunteeringDate.format("YYYY-MM-DD HH:mm");

    const recruitData: TablesInsert<"recruits"> = {
      maxSponsorRecruits,
      maxRecipientRecruits,
      deadLineDate,
      volunteeringDate,
      region,
      title,
      content,
      isEnd,
      authorId: userId,
    };

    createRecruit(recruitData);
  };

  return {
    errMsgs,
    today,
    handleSubmitRecruitForm,
  };
}

export default useNewRecruitForm;
