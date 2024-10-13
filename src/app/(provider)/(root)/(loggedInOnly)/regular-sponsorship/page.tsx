"use client";

import clientApi from "@/api/clientSide/api";
import ButtonGroup from "@/components/Button/ButtonGroup";
import InputGroup from "@/components/Inputs/InputGroup";
import Page from "@/components/Page/Page";
import { useAuthStore } from "@/zustand/auth.store";
import { useQuery } from "@tanstack/react-query";
import {
  loadTossPayments,
  TossPaymentsPayment,
} from "@tosspayments/tosspayments-sdk";
import { ComponentProps, useEffect, useState } from "react";

const clientKey = process.env.NEXT_PUBLIC_TOSS_PAYMENT_CLIENT_KEY;
if (!clientKey) throw new Error("cannot find toss client key");

function RegularSponsorShipPage() {
  const [payment, setPayment] = useState<TossPaymentsPayment | null>(null);
  const [price, setPrice] = useState("10000");
  const [priceErrorMsg, setPriceErrorMsg] = useState<string | null>(null);

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
    (async () => {
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
    })();
  }, [clientKey, userId]);

  async function requestBillingAuth() {
    if (!payment || !user || !userProfile) return;
    if (+price < 10000)
      return setPriceErrorMsg("최소 후원금액이 10,000₩ 입니다");
    await payment.requestBillingAuth({
      method: "CARD",
      successUrl:
        window.location.origin +
        `/regular-sponsorship/billing/${"ff30dc7b-83f7-455b-b794-7ab5c1147d21"}/${price}`,
      failUrl: window.location.origin + "/regular-sponsorship/fail",
      customerEmail: user.email,
      customerName: userProfile.nickname,
    });
  }
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
  );
}

export default RegularSponsorShipPage;
