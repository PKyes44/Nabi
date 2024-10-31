"use client";

import ButtonGroup from "@/components/Button/ButtonGroup";
import InputGroup from "@/components/Inputs/InputGroup";
import Modal from "@/components/Modal/Modal";
import { CustomFormEvent } from "@/types/formEvent.types";
import { useModalStore } from "@/zustand/modal.store";
import { useRouter } from "next/navigation";
import { ComponentProps, useState } from "react";

interface FundModal {
  domain: string;
}

function FundModal({ domain }: FundModal) {
  const router = useRouter();
  const { activeModal, setActiveModal } = useModalStore();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmitFund: ComponentProps<"form">["onSubmit"] = (
    e: CustomFormEvent<{ amount: HTMLInputElement }>
  ) => {
    e.preventDefault();
    setErrorMsg(null);

    const amount = +e.target.amount.value;

    if (isNaN(amount)) return setErrorMsg("잘못된 모금액입니다");
    if (amount < 10000) return setErrorMsg("최소 모금액은 10,000₩입니다");

    router.replace(`/funds/${domain}/${amount}`);
    setActiveModal(null);
  };

  return (
    <>
      {activeModal && (
        <Modal className="grid place-items-center">
          <article className="w-96 h-72 sm:w-[300px] sm:h-auto bg-white rounded-lg py-5 px-10">
            <h1 className="font-bold text-center text-xl mb-12">
              후원 기금 모금하기
            </h1>
            <form
              onSubmit={handleSubmitFund}
              className="flex flex-col gap-y-10 justify-around w-full"
            >
              <InputGroup
                label="후원 모금액"
                wrapperClassName="w-full sm:text-xs"
                defaultValue="10000"
                helpText="최소 모금액은 10,000₩입니다"
                name="amount"
                type="number"
                errorText={errorMsg}
              />

              <ButtonGroup
                wrapperClassName="w-full"
                intent="primary"
                textIntent="primary"
                value="모금하기"
                className="w-full py-2.5"
              />
            </form>
          </article>
        </Modal>
      )}
    </>
  );
}

export default FundModal;
