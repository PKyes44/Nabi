"use client";

import ButtonGroup from "@/components/Button/ButtonGroup";
import InputGroup from "@/components/Inputs/InputGroup";
import { CustomFormEvent } from "@/types/formEvent.types";
import dayjs from "dayjs";
import { ComponentProps } from "react";

type freeMealFormEvent = {
  storeName: HTMLFormElement;
  storeAddress: HTMLFormElement;
  date: HTMLFormElement;
  time: HTMLFormElement;
  maxServingCount: HTMLFormElement;
};
type FreeMealFormEvent = CustomFormEvent<freeMealFormEvent>;

function CreateFreeMealForm() {
  const handleSubmitCreateFreeMeal: ComponentProps<"form">["onSubmit"] = (
    e: FreeMealFormEvent
  ) => {
    e.preventDefault();
    const storeName = e.target.storeName.value;
    const storeAddress = e.target.storeAddress.value;
    const date = e.target.date.value;
    const time = e.target.time.value;
    const freeMealDate = dayjs(`${date} ${time}`).format("YYYY-MM-DD HH:mm");
    const maxServingCount = e.target.maxServingCount.value;

    const insertFreeMealData = {
      storeName,
      storeAddress,
      freeMealDate,
      maxServingCount,
    };
    console.log(insertFreeMealData);
  };

  return (
    <form
      onSubmit={handleSubmitCreateFreeMeal}
      className="w-full h-full flex flex-col items-center justify-center gap-y-2"
    >
      <h1 className="mt-10 mb-5 text-3xl font-bold">무상식사 구인공고 작성</h1>

      <InputGroup label="매장 이름" name="storeName" />
      <InputGroup label="매장 위치 (주소)" name="storeAddress" />
      <div className="grid grid-cols-2 gap-x-5 w-96">
        <InputGroup
          label="날짜"
          type="date"
          name="date"
          wrapperClassName="w-full"
        />
        <InputGroup
          label="시간"
          type="time"
          name="time"
          wrapperClassName="w-full"
        />
      </div>
      <InputGroup label="수용 가능 인원" name="maxServingCount" />

      <ButtonGroup value="작성하기" className="w-96 mt-5" size="md" />
    </form>
  );
}

export default CreateFreeMealForm;
