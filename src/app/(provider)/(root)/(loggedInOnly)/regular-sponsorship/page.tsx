"use client";

import clientApi from "@/api/clientSide/api";
<<<<<<< HEAD
=======
import ButtonGroup from "@/components/Button/ButtonGroup";
import InputGroup from "@/components/Inputs/InputGroup";
import Page from "@/components/Page/Page";
>>>>>>> develop
import { useAuthStore } from "@/zustand/auth.store";
import { useQuery } from "@tanstack/react-query";
import {
  loadTossPayments,
  TossPaymentsPayment,
} from "@tosspayments/tosspayments-sdk";
<<<<<<< HEAD
import { useEffect, useState } from "react";
=======
import { ComponentProps, useEffect, useState } from "react";
>>>>>>> develop

const clientKey = process.env.NEXT_PUBLIC_TOSS_PAYMENT_CLIENT_KEY;
if (!clientKey) throw new Error("cannot find toss client key");

function RegularSponsorShipPage() {
  const [payment, setPayment] = useState<TossPaymentsPayment | null>(null);
<<<<<<< HEAD
=======
  const [price, setPrice] = useState("10000");
  const [priceErrorMsg, setPriceErrorMsg] = useState<string | null>(null);
>>>>>>> develop

  const userId = useAuthStore((state) => state.currentUserId);

  const { data: userProfile } = useQuery({
    queryKey: ["userProfiles", { userId }],
    queryFn: () => clientApi.profiles.getProfileByUserId(userId!),
  });
  const { data: user } = useQuery({
    queryKey: ["users"],
    queryFn: () => clientApi.auth.getUser(),
  });

  useEffect(() => {
<<<<<<< HEAD
    async function fetchPayment() {
=======
    (async () => {
>>>>>>> develop
      try {
        if (!userId) return;

        const tossPayments = await loadTossPayments(clientKey!);

        const payment = tossPayments.payment({
          customerKey: userId,
        });

        setPayment(payment);
      } catch (error) {
        console.error("Error fetching payment:", error);
      }
<<<<<<< HEAD
    }

    fetchPayment();
=======
    })();
>>>>>>> develop
  }, [clientKey, userId]);

  async function requestBillingAuth() {
    if (!payment || !user || !userProfile) return;
<<<<<<< HEAD
    await payment.requestBillingAuth({
      method: "CARD",
      successUrl: window.location.origin + "/payment/billing",
      failUrl: window.location.origin + "/404",
=======
    if (+price < 10000)
      return setPriceErrorMsg("최소 후원금액이 10,000₩ 입니다");
    await payment.requestBillingAuth({
      method: "CARD",
      successUrl:
        window.location.origin +
        `/regular-sponsorship/billing/${"ff30dc7b-83f7-455b-b794-7ab5c1147d21"}/${price}`,
      failUrl: window.location.origin + "/regular-sponsorship/fail",
>>>>>>> develop
      customerEmail: user.email,
      customerName: userProfile.nickname,
    });
  }
<<<<<<< HEAD

  return (
    <div className="wrapper">
      <div className="box_section">
        <h1>정기 결제</h1>
        <button className="button" onClick={requestBillingAuth}>
          정기 후원하기
        </button>
      </div>
    </div>
=======
  const handleChangePrice: ComponentProps<"input">["onChange"] = (e) => {
    const newPriceValue = e.target.value;
    setPrice(newPriceValue);
  };

  return (
    <Page isMain width="md">
      <div className="wrapper">
        <div className="box_section">
          <h1>정기 결제</h1>
          <InputGroup
            value={price}
            errorText={priceErrorMsg}
            onChange={handleChangePrice}
            label="후원금액"
            helpText="최소 후원 금액은 10,000₩입니다"
            type="number"
          />
          <ButtonGroup onClick={requestBillingAuth} value="정기 후원하기" />
        </div>
      </div>
    </Page>
>>>>>>> develop
  );
}

export default RegularSponsorShipPage;
