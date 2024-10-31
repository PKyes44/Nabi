"use client";

import ButtonGroup from "@/components/Button/ButtonGroup";
import InputGroup from "@/components/Inputs/InputGroup";
import useNewRecruitForm from "./NewRecruitForm.hooks";

function NewRecruitForm() {
  const { errMsgs, today, handleSubmitRecruitForm } = useNewRecruitForm();

  return (
    <form
      onSubmit={handleSubmitRecruitForm}
      className="flex flex-col gap-y-4 w-full mt-10 sm:text-[12px]"
    >
      <InputGroup
        intent="comment"
        wrapperClassName="w-full"
        type="text"
        label="제목"
        name="title"
        errorText={errMsgs.title}
      />
      <div className="grid grid-cols-2 gap-x-2 w-full">
        <InputGroup
          intent="comment"
          wrapperClassName="w-full"
          type="number"
          label="봉사자 모집 인원"
          name="maxSponsorRecruits"
          errorText={errMsgs.maxSponsorRecruits}
        />
        <InputGroup
          intent="comment"
          wrapperClassName="w-full"
          type="number"
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
          min={today}
        />
        <InputGroup
          intent="comment"
          wrapperClassName="w-full"
          label="봉사 활동 날짜"
          type="date"
          name="volunteeringDate"
          errorText={errMsgs.volunteeringDate}
          min={today}
        />
        <InputGroup
          intent="comment"
          wrapperClassName="w-full sm:col-span-1 md:col-span-2"
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
          className={`bg-[#f5f5f5] resize-none w-full h-60 sm:h-32 p-3 outline-none border border-gray-200 rounded-sm ${
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
        value="등록하기"
        size="md"
        className="ml-auto sm:h-7 sm:px-0 sm:py-0 sm:w-full sm:text-[12px]"
        wrapperClassName="h-7"
      />
    </form>
  );
}

export default NewRecruitForm;
