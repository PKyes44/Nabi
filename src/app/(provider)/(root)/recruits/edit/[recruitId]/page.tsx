"use client";

import clientApi from "@/api/clientSide/api";
import ButtonGroup from "@/components/Button/ButtonGroup";
import InputGroup from "@/components/Inputs/InputGroup";
import Page from "@/components/Page/Page";
import { Database } from "@/supabase/database.types";
import { useAuthStore } from "@/zustand/auth.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ComponentProps, FormEvent, useState } from "react";

interface InitialErrMsgs {
  maxSponsorRecruits: string | null;
  maxRecipientRecruits: string | null;
  deadLineDate: string | null;
  volunteeringDate: string | null;
  region: string | null;
  title: string | null;
}

const initialErrMsgs = {
  maxSponsorRecruits: null,
  maxRecipientRecruits: null,
  deadLineDate: null,
  volunteeringDate: null,
  region: null,
  title: null,
};

type CustomFormEvent = FormEvent<HTMLFormElement> & {
  target: FormEvent<HTMLFormElement>["target"] & {
    donationType: HTMLSelectElement;
    maxSponsorRecruits: HTMLInputElement;
    maxRecipientRecruits: HTMLInputElement;
    deadLineDate: HTMLInputElement;
    volunteeringDate: HTMLInputElement;
    region: HTMLInputElement;
    title: HTMLInputElement;
    content: HTMLTextAreaElement;
  };
};

interface EditRecruitPageProps {
  params: {
    recruitId: string;
  };
}
function EditRecruitPage({ params: { recruitId } }: EditRecruitPageProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [errMsgs, setErrMsgs] = useState<InitialErrMsgs>(initialErrMsgs);
  const authorId = useAuthStore((state) => state.currentUserId);

  if (!authorId) return router.push("/");

  const { mutate: editRecruit } = useMutation<
    unknown,
    Error,
    Database["public"]["Tables"]["recruits"]["Update"]
  >({
    mutationFn: (data) => clientApi.recruits.editRecruit(recruitId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recruits"] });
      alert("수정되었습니다.");
      router.push(`/`);
    },
    onError: (e) => {
      alert(e.message);
    },
  });

  const throwErrMsgs = (type: string, message: string) => {
    setErrMsgs((prevErrMsgs) => ({ ...prevErrMsgs, [type]: message }));
  };
  const handleSubmitRecruitEditForm: ComponentProps<"form">["onSubmit"] =
    async (e: CustomFormEvent) => {
      e.preventDefault();

      const maxSponsorRecruits = +e.target.maxSponsorRecruits.value;
      const maxRecipientRecruits = +e.target.maxRecipientRecruits.value;
      const deadLineDate = e.target.deadLineDate.value;
      const volunteeringDate = e.target.volunteeringDate.value;
      const region = e.target.region.value;
      const title = e.target.title.value;
      const content = e.target.content.value;
      const isEnd = false;

      setErrMsgs(initialErrMsgs);

      if (!maxSponsorRecruits)
        return throwErrMsgs(
          "maxSponsorRecruits",
          "봉사자 모집 인원을 입력해주세요"
        );
      if (!maxRecipientRecruits)
        return throwErrMsgs(
          "maxRecipientRecruits",
          "후원 아동 모집 인원을 입력해주세요"
        );
      if (!deadLineDate)
        return throwErrMsgs("deadLineDate", "모집 마감 날짜를 입력해주세요");
      if (!volunteeringDate)
        return throwErrMsgs(
          "volunteeringDate",
          "자원 봉사 날짜를 입력해주세요"
        );
      if (!region) return throwErrMsgs("region", "지역을 입력해주세요");
      if (!title) return throwErrMsgs("title", "제목을 입력해주세요");

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
          authorId,
        };

      editRecruit(recruitEditData);
    };

  return (
    <Page width="lg" isMain={false} className="h-full py-10">
      <div className="bg-white p-10 rounded-md">
        <h1 className="mb-10 text-3xl font-bold">봉사원 모집글 수정</h1>

        <form
          onSubmit={handleSubmitRecruitEditForm}
          className="flex flex-col gap-y-2"
        >
          <div className="flex gap-x-2">
            <InputGroup
              type="text"
              label="봉사자 모집 인원"
              name="maxSponsorRecruits"
              errorText={errMsgs.maxSponsorRecruits}
            />
            <InputGroup
              type="text"
              label="후원 아동 모집 인원"
              name="maxRecipientRecruits"
              errorText={errMsgs.maxRecipientRecruits}
            />
          </div>
          <div className="flex gap-x-2">
            <InputGroup
              type="text"
              label="모집 마감 날짜"
              name="deadLineDate"
              errorText={errMsgs.deadLineDate}
            />
            <InputGroup
              type="text"
              label="자원 봉사 날짜"
              name="volunteeringDate"
              errorText={errMsgs.volunteeringDate}
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
              className="border-black border resize-none w-full h-60 p-3 "
            />
          </div>

          <ButtonGroup value="수정하기" size="md" className="mt-4" />
        </form>
      </div>
    </Page>
  );
}

export default EditRecruitPage;
