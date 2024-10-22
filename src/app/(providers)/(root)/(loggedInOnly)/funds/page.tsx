"use client";

import clientApi from "@/api/clientSide/api";
import Button from "@/components/Button/Button";
import Container from "@/components/Container/Container";
import { useAuthStore } from "@/zustand/auth.store";
import { useQuery } from "@tanstack/react-query";
import {
  loadTossPayments,
  TossPaymentsWidgets,
} from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";

const clientKey = process.env.NEXT_PUBLIC_TOSS_PAYMENT_CLIENT_KEY;
if (!clientKey) throw new Error("cannot find toss client key");

interface FundCheckOutPageProps {
  searchParams: {
    sponAmount: string;
    domain: string;
  };
}
function FundCheckOutPage({
  searchParams: { sponAmount = "10000", domain },
}: FundCheckOutPageProps) {
  const currentUser = useAuthStore((state) => state.currentUser);
  const [amount] = useState({
    currency: "KRW",
    value: +sponAmount,
  });
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);

  const { data: profile } = useQuery({
    queryKey: ["userProfiles"],
    queryFn: () => clientApi.profiles.getProfileByUserId(currentUser!.userId),
  });

  useEffect(() => {
    async function fetchPaymentWidgets() {
      try {
        console.log("clientKey: ", clientKey);
        const tossPayments = await loadTossPayments(clientKey!);

        const widgets = tossPayments.widgets({
          customerKey: currentUser!.userId,
        });

        setWidgets(widgets);
      } catch (error) {
        console.error("Error fetching payment widget:", error);
      }
    }

    fetchPaymentWidgets();
  }, [clientKey, currentUser]);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets == null) {
        return;
      }
      await widgets.setAmount(amount);

      await widgets.renderPaymentMethods({
        selector: "#payment-method",
        variantKey: "DEFAULT",
      });

      await widgets.renderAgreement({
        selector: "#agreement",
        variantKey: "AGREEMENT",
      });

      setReady(true);
    }

    renderPaymentWidgets();
  }, [widgets]);

  return (
    <Container className="w-[700px] py-10 ">
      <div className="box_section bg-white rounded-lg shadow-lg px-10 py-10">
        {/* 결제 UI */}
        <div id="payment-method" />
        {/* 이용약관 UI */}
        <div id="agreement" />

        {/* 결제하기 버튼 */}
        <Button
          value="결제하기"
          intent="primary"
          textIntent="primary"
          className="w-full py-2.5"
          disabled={!ready}
          onClick={async () => {
            const successUrl =
              window.location.origin +
              `/funds/${encodeURIComponent(domain)}/success`;

            try {
              await widgets!.requestPayment({
                orderId: crypto.randomUUID(),
                orderName: `${domain} 후원 기금`,
                successUrl,
                failUrl: window.location.origin + "/fail",
                customerEmail: profile?.email,
                customerName: profile?.nickname,
                customerMobilePhone: "01012341234",
              });
            } catch (error) {
              // 에러 처리하기
              console.error(error);
            }
          }}
        >
          결제하기
        </Button>
      </div>
    </Container>
  );
}

export default FundCheckOutPage;
