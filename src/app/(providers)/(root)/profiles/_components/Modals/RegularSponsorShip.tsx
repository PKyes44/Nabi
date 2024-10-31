"use client";

import clientApi from "@/api/clientSide/api";
import ButtonGroup from "@/components/Button/ButtonGroup";
import InputGroup from "@/components/Inputs/InputGroup";
import { useAuthStore } from "@/zustand/auth.store";
import { useQuery } from "@tanstack/react-query";
import {
  loadTossPayments,
  TossPaymentsPayment,
} from "@tosspayments/tosspayments-sdk";
import { useSearchParams } from "next/navigation";
import { ComponentProps, useEffect, useState } from "react";

const clientKey = process.env.NEXT_PUBLIC_TOSS_BILLING_CLIENT_KEY;
if (!clientKey) throw new Error("cannot find toss client key");

function RegularSponsorShip() {
  const params = useSearchParams();
  const [payment, setPayment] = useState<TossPaymentsPayment | null>(null);
  const [price, setPrice] = useState("10000");
  const [priceErrorMsg, setPriceErrorMsg] = useState<string | null>(null);

  const currentUser = useAuthStore((state) => state.currentUser);
  const recipientId = params.get("userId");

  const { data: userProfile } = useQuery({
    queryKey: ["userProfiles", { userId: currentUser?.userId }],
    queryFn: () => clientApi.profiles.getProfileByUserId(currentUser?.userId!),
  });
  const { data: user } = useQuery({
    queryKey: ["users"],
    queryFn: () => clientApi.auth.getUser(),
  });

  const requestBillingAuth = async () => {
    if (!payment || !user || !userProfile) return;
    if (+price < 10000)
      return setPriceErrorMsg("최소 후원금액이 10,000₩ 입니다");
    await payment.requestBillingAuth({
      method: "CARD",
      successUrl:
        window.location.origin +
        `/regular-sponsorship/billing/${recipientId}/${price}`,
      failUrl: window.location.origin + "/fail",
      customerEmail: user.email,
      customerName: userProfile.nickname,
    });
  };

  const handleChangePrice: ComponentProps<"input">["onChange"] = (e) => {
    const newPriceValue = e.target.value;
    setPrice(newPriceValue);
  };

  useEffect(() => {
    (async () => {
      try {
        if (!currentUser) return;

        const tossPayments = await loadTossPayments(clientKey!);

        const payment = tossPayments.payment({
          customerKey: currentUser.userId,
        });

        setPayment(payment);
      } catch (error) {
        console.error("Error fetching payment:", error);
      }
    })();
  }, [currentUser]);

  return (
    <div className="flex flex-col gap-y-[70px] px-10 py-10 justify-between sm:py-5 sm:px-5 w-full sm:gap-y-10">
      <h1 className="font-bold text-3xl text-center sm:text-lg">
        정기 후원하기
      </h1>
      <InputGroup
        value={price}
        errorText={priceErrorMsg}
        onChange={handleChangePrice}
        label="후원금액"
        wrapperClassName="w-full sm:text-xs"
        helpText="최소 후원 금액은 10,000₩입니다"
        type="number"
      />
      <ButtonGroup
        onClick={requestBillingAuth}
        intent="primary"
        textIntent="primary"
        className="w-full py-3.5 text-lg sm:text-xs"
        value="정기 후원하기"
      />
    </div>
  );
}

export default RegularSponsorShip;
