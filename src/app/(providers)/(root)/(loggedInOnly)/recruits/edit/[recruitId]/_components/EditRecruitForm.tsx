"use client";

import ButtonGroup from "@/components/Button/ButtonGroup";
import InputGroup from "@/components/Inputs/InputGroup";
import dayjs from "dayjs";
import useEditRecruitForm from "./EditRecruitForm.hooks";
interface EditRecruitFormProps {
  recruitId: string;
}

function EditRecruitForm({ recruitId }: EditRecruitFormProps) {
  const { isLoading, recruit, errMsgs, today, handleSubmitRecruitEditForm } =
    useEditRecruitForm(recruitId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form
      onSubmit={handleSubmitRecruitEditForm}
      className="flex flex-col gap-y-4 w-full sm:text-[12px]"
    >
      <InputGroup
        intent="comment"
        wrapperClassName="w-full"
        defaultValue={recruit?.title}
        type="text"
        label="제목"
        name="title"
        errorText={errMsgs.title}
      />
      <div className="flex gap-x-2 w-full">
        <InputGroup
          intent="comment"
          wrapperClassName="w-full"
          defaultValue={recruit?.maxSponsorRecruits}
          type="text"
          label="봉사자 모집 인원"
          name="maxSponsorRecruits"
          errorText={errMsgs.maxSponsorRecruits}
        />
        <InputGroup
          intent="comment"
          wrapperClassName="w-full"
          defaultValue={recruit?.maxRecipientRecruits}
          type="text"
          label="후원 아동 모집 인원"
          name="maxRecipientRecruits"
          errorText={errMsgs.maxRecipientRecruits}
        />
      </div>
      <div className="grid grid-cols-3 gap-x-2 w-full sm:grid-cols-1 md:grid-cols-2 md:gap-y-4">
        <InputGroup
          intent="comment"
          wrapperClassName="w-full"
          label="모집 마감 날짜"
          type="date"
          name="deadLineDate"
          errorText={errMsgs.deadLineDate}
          defaultValue={dayjs(recruit?.deadLineDate).format("YYYY-MM-DD")}
          min={today}
        />
        <InputGroup
          intent="comment"
          wrapperClassName="w-full"
          label="봉사 활동 날짜"
          type="date"
          name="volunteeringDate"
          errorText={errMsgs.volunteeringDate}
          defaultValue={dayjs(recruit?.volunteeringDate).format("YYYY-MM-DD")}
          min={today}
        />
        <InputGroup
          intent="comment"
          wrapperClassName="w-full sm:col-span-1 md:col-span-2"
          defaultValue={recruit?.region}
          type="text"
          label="집합 장소"
          name="region"
          errorText={errMsgs.region}
        />
      </div>

      <div className="mb-4">
        <p className="mb-1">내용</p>
        <textarea
          name="content"
          defaultValue={recruit?.content}
          className={`bg-[#f5f5f5] resize-none w-full h-60 sm:h-32 p-3 ${
            errMsgs.content && "border-red-500"
          }`}
        />
        {errMsgs.content && (
          <span className="text-red-500 text-sm">{errMsgs.content}</span>
        )}
      </div>
      <ButtonGroup
        intent="primary"
        textIntent="primary"
        value="수정하기"
        size="md"
        className="ml-auto sm:h-7 sm:px-0 sm:py-0 sm:w-full sm:text-[12px]"
        wrapperClassName="h-7"
      />
    </form>
  );
}

export default EditRecruitForm;
