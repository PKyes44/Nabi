"use client";

import clientApi from "@/api/clientSide/api";
import ButtonGroup from "@/components/Button/ButtonGroup";
import Page from "@/components/Page/Page";
import { useAuthStore } from "@/zustand/auth.store";
import { useQuery } from "@tanstack/react-query";
import {
  loadTossPayments,
  TossPaymentsPayment,
} from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";

const clientKey = process.env.NEXT_PUBLIC_TOSS_PAYMENT_CLIENT_KEY;
if (!clientKey) throw new Error("cannot find toss client key");

function RegularSponsorShipPage() {
  const [payment, setPayment] = useState<TossPaymentsPayment | null>(null);

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
    await payment.requestBillingAuth({
      method: "CARD",
      successUrl: window.location.origin + "/regular-sponsorship/billing",
      failUrl: window.location.origin + "/regular-sponsorship/fail",
      customerEmail: user.email,
      customerName: userProfile.nickname,
    });
  }

  return (
    <Page isMain width="md">
      <div className="wrapper">
        <div className="box_section">
          <h1>정기 결제</h1>
          <ButtonGroup onClick={requestBillingAuth} value="정기 후원하기" />
        </div>
      </div>
    </Page>
  );
}

export default RegularSponsorShipPage;
