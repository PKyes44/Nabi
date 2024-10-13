"use client";

import clientApi from "@/api/clientSide/api";
import ButtonGroup from "@/components/Button/ButtonGroup";
import InputGroup from "@/components/Inputs/InputGroup";
import { Database } from "@/supabase/database.types";
import { CustomFormEvent } from "@/types/formEvent.types";
import { useAuthStore } from "@/zustand/auth.store";
import { useMutation, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { ComponentProps, useState } from "react";

type freeMealFormEvent = {
  storeId: HTMLFormElement;
  date: HTMLFormElement;
  time: HTMLFormElement;
  maxServingCount: HTMLFormElement;
};
type FreeMealFormEvent = CustomFormEvent<freeMealFormEvent>;

type InitialErrMsgs = {
  storeId: string | null;
  date: string | null;
  time: string | null;
  maxServingCount: string | null;
};
const initialErrMsgs: InitialErrMsgs = {
  storeId: null,
  date: null,
  time: null,
  maxServingCount: null,
};

function CreateFreeMealForm() {
  const router = useRouter();
  const [errorMsgs, setErrorMsgs] = useState<InitialErrMsgs>(initialErrMsgs);
  const sponsorId = useAuthStore((state) => state.currentUserId);

  const { data: stores, isLoading } = useQuery({
    queryKey: ["storeOwners", { sponsorId }],
    queryFn: () => clientApi.storeOwners.getStoreByUserId(sponsorId!),
  });
  const { mutate: insertFreeMeal } = useMutation({
    mutationFn: (
      insertData: Database["public"]["Tables"]["freeMeals"]["Insert"]
    ) => clientApi.freeMeal.insertFreeMeals(insertData),
    onSuccess: (...arg) => {
      console.log("success: ", arg);
      router.push("/");
    },
    onError: (...arg) => {
      console.log("error: ", arg);
    },
  });

  const handleSubmitCreateFreeMeal: ComponentProps<"form">["onSubmit"] = (
    e: FreeMealFormEvent
  ) => {
    e.preventDefault();

    setErrorMsgs(initialErrMsgs);

    if (!sponsorId) return;

    const storeId = e.target.storeId.value;
    const date = e.target.date.value;
    const time = e.target.time.value;
    const maxServingCount = e.target.maxServingCount.value;

    if (date.length === 0) return throwErrorMsgs("date", "날짜를 지정해주세요");
    if (time.length === 0) return throwErrorMsgs("time", "시간을 지정해주세요");

    let day = dayjs(`${date} ${time}`);
    const now = dayjs();
    if (!day.isAfter(now))
      return throwErrorMsgs("date", "작성된 시점보다 이후여야 합니다");
    if (!storeId || storeId.length === 0)
      return throwErrorMsgs("storeId", "매장명을 작성해주세요");
    if (maxServingCount <= 0)
      return throwErrorMsgs(
        "maxServingCount",
        "수용 인원을 1명 이상 작성해주세요"
      );
    const freeMealDate = day.format("YYYY-MM-DD HH:mm");

    const insertFreeMealData: Database["public"]["Tables"]["freeMeals"]["Insert"] =
      {
        sponsorId,
        storeId,
        freeMealDate,
        maxServingCount,
      };
    console.log(insertFreeMealData);
    insertFreeMeal(insertFreeMealData);
  };

  const throwErrorMsgs = (target: string, message: string) => {
    setErrorMsgs((prevErrMsgs) => ({
      ...prevErrMsgs,
      [target]: message,
    }));
  };

  if (isLoading) return <span>데이터를 불러오는 중</span>;

  return (
    <form
      onSubmit={handleSubmitCreateFreeMeal}
      className="w-full h-full flex flex-col items-center justify-center gap-y-3"
    >
      <h1 className="mt-10 mb-5 text-3xl font-bold">무상식사 구인공고 작성</h1>

      <div className="flex flex-col w-96 gap-y-1">
        <label htmlFor="storeId">매장 이름</label>
        <div className="px-3 w-full h-10 bg-transparent border border-black rounded-sm">
          <select
            name="storeId"
            id="storeId"
            className="h-full w-full outline-none bg-transparent"
          >
            {stores!.map((store) => {
              return (
                <option key={store.storeId} value={store.storeId}>
                  {store.storeDatas!.brandName}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-5 w-96">
        <InputGroup
          label="날짜"
          type="date"
          name="date"
          errorText={errorMsgs.date}
          wrapperClassName="w-full"
        />
        <InputGroup
          label="시간"
          type="time"
          name="time"
          errorText={errorMsgs.time}
          wrapperClassName="w-full"
        />
      </div>
      <InputGroup
        label="수용 가능 인원"
        name="maxServingCount"
        errorText={errorMsgs.maxServingCount}
      />

      <ButtonGroup value="작성하기" className="w-96 mt-5" size="md" />
    </form>
  );
}

export default CreateFreeMealForm;
