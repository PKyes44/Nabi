"use client";

import ButtonGroup from "@/components/Button/ButtonGroup";
import InputGroup from "@/components/Inputs/InputGroup";
import Loading from "@/components/Loading/Loading";
import useCreateFreeMealForm from "./CreateFreeMealForm.hooks";

function CreateFreeMealForm() {
  const { isLoading, errorMsgs, stores, handleSubmitCreateFreeMeal } =
    useCreateFreeMealForm();

  if (isLoading) return <Loading />;

  return (
    <div className="px-6 w-[500px] sm:w-[240px] sm:px-3">
      <form
        onSubmit={handleSubmitCreateFreeMeal}
        className="flex flex-col items-center justify-center gap-y-3 w-full"
      >
        <h1 className=" mb-5 text-3xl font-bold sm:text-lg">
          무상식사 제공하기
        </h1>

        <div className="flex flex-col w-full gap-y-4 sm:text-xs sm:gap-y-3">
          <label htmlFor="storeId">매장명</label>
          <div className="px-3 w-full h-10 bg-[#f5f5f5] border rounded-sm sm:text-xs">
            <select
              name="storeId"
              id="storeId"
              className="h-full w-full outline-none bg-transparent "
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
          <div className="grid grid-cols-2 gap-x-5 w-full sm:text-xs sm:flex sm:flex-col gap-y-3">
            <InputGroup
              intent="comment"
              label="날짜"
              type="date"
              name="date"
              errorText={errorMsgs.date}
              wrapperClassName="w-full"
            />
            <InputGroup
              intent="comment"
              label="시간"
              type="time"
              name="time"
              errorText={errorMsgs.time}
              wrapperClassName="w-full"
            />
          </div>
          <InputGroup
            intent="comment"
            label="수용 가능 인원"
            name="maxServingCount"
            errorText={errorMsgs.maxServingCount}
            wrapperClassName="w-full"
          />
        </div>

        <ButtonGroup
          intent="primary"
          textIntent="primary"
          value="등록하기"
          className="sm:h-7 sm:px-0 sm:py-0 w-full sm:text-[12px] mt-3"
          wrapperClassName="w-full"
          size="md"
        />
      </form>
    </div>
  );
}

export default CreateFreeMealForm;
