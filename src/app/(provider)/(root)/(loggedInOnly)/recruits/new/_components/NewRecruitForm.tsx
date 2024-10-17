"use client";

import clientApi from "@/api/clientSide/api";
import ButtonGroup from "@/components/Button/ButtonGroup";
import InputGroup from "@/components/Inputs/InputGroup";
import { Database } from "@/supabase/database.types";
import { CustomFormEvent } from "@/types/formEvent.types";
import { useAuthStore } from "@/zustand/auth.store";
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

function NewRecruitForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [errMsgs, setErrMsgs] = useState<InitialErrMsgs>(initialErrMsgs);
  const author = useAuthStore((state) => state.currentUser);
  const today = dayjs().format("YYYY-MM-DD");

  const { mutate: createRecruit } = useMutation<
    unknown,
    Error,
    Database["public"]["Tables"]["recruits"]["Insert"]
  >({
    mutationFn: (data) => clientApi.recruits.createRecruit(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recruits"] });
      alert("추가되었습니다.");
      router.push(`/`);
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
    if (!title) return throwErrMsgs("title", "제목을 입력해주세요");
    if (!content) return throwErrMsgs("content", "내용을 작성해주세요");

    const deadLineDate = nonFormatDeadLineDate.format("YYYY-MM-DD HH:mm");
    const volunteeringDate =
      nonFormatVolunteeringDate.format("YYYY-MM-DD HH:mm");

    const recruitData: Database["public"]["Tables"]["recruits"]["Insert"] = {
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

    createRecruit(recruitData);
  };

  return (
    <form onSubmit={handleSubmitRecruitForm} className="flex flex-col gap-y-2">
      <div className="flex gap-x-2">
        <InputGroup
          type="number"
          label="봉사자 모집 인원"
          name="maxSponsorRecruits"
          errorText={errMsgs.maxSponsorRecruits}
        />
        <InputGroup
          type="number"
          label="후원 아동 모집 인원"
          name="maxRecipientRecruits"
          errorText={errMsgs.maxRecipientRecruits}
        />
      </div>
      <div className="flex gap-x-2">
        <InputGroup
          label="모집 마감 날짜"
          type="date"
          name="deadLineDate"
          errorText={errMsgs.deadLineDate}
          min={today}
        />
        <InputGroup
          label="봉사 활동 날짜"
          type="date"
          name="volunteeringDate"
          errorText={errMsgs.volunteeringDate}
          min={today}
        />
      </div>

      <InputGroup
        type="text"
        label="지역"
        name="region"
        errorText={errMsgs.region}
      />

      <InputGroup
        type="text"
        label="제목"
        name="title"
        errorText={errMsgs.title}
      />
      <div>
        <p className="mb-1">내용</p>
        <textarea
          name="content"
          className={`border-black border resize-none w-full h-60 p-3 ${
            errMsgs.content && "border-red-500"
          }`}
        />
        {errMsgs.content && (
          <span className="text-red-500 text-sm">{errMsgs.content}</span>
        )}
      </div>

      <ButtonGroup value="등록하기" size="md" className="mt-4" />
    </form>
  );
}

export default NewRecruitForm;
