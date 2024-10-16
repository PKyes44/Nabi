"use client";

import clientApi from "@/api/clientSide/api";
import Page from "@/components/Page/Page";
import { PaymentResponse } from "@/types/paymentResponse.types";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface RegularSponsorShipBillingPageProps {
  searchParams: {
    customerKey: string;
    authKey: string;
  };
  params: {
    recipientId: string;
    price: string;
  };
}

function RegularSponsorShipBillingPage({
  searchParams: { customerKey, authKey },
  params: { recipientId, price },
}: RegularSponsorShipBillingPageProps) {
  const router = useRouter();
  const [receipt, setReceipt] = useState<PaymentResponse | null>(null);
  const { mutate: getBillingKey } = useMutation({
    mutationFn: (requestData: {
      customerKey: string;
      authKey: string;
      price: number;
      recipientId: string;
    }) => clientApi.sponsorShip.getBillingKey(requestData),
    onSuccess: (responseData: PaymentResponse) => {
      console.log("success:", responseData);
      setReceipt(responseData);
    },
    onError: (data: { message: string; code: string }) => {
      console.log("error: ", data);
      router.replace(`?code=${data.code}&message=${data.message}`);
    },
  });

  useEffect(() => {
    const requestData = {
      recipientId,
      price: +price,
      authKey,
      customerKey,
    };
    getBillingKey(requestData);
  }, []);

  return (
    <Page isMain className="pt-10 flex flex-col">
      <img
        width="100px"
        src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
      />

      <h2 className="font-extrabold text-2xl mt-5">결제를 완료했어요</h2>
      <article className="mt-10 flex flex-col gap-y-5">
        <div className="flex gap-x-5">
          <div className="flex flex-col">
            <span className="font-bold">결제번호</span>
            <span>{receipt?.orderId}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold">결제명</span>
            <span>{receipt?.orderName}</span>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="font-bold">결제금액</span>
          <span>{receipt?.amount.toLocaleString()}</span>
        </div>

        <div>
          <h3 className="font-bold">
            카드 번호 :
            <span className="font-normal">{receipt?.card.number}</span>
          </h3>
          <span className="text-sm">
            {receipt?.card.ownerType} | {receipt?.card.cardType}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold">결제일</span>
          <time>{dayjs(receipt?.approvedAt).format("YYYY-MM-DD HH:mm")}</time>
        </div>
      </article>
      <div className="p-grid-col mt-5 flex gap-x-5">
        <Link
          href="https://docs.tosspayments.com/guides/v2/payment-widget/integration"
          className="bg-blue-50 text-blue-600"
        >
          <button className="button p-grid-col5">연동 문서</button>
        </Link>
        <Link href="https://discord.gg/A4fRFXQhRu">
          <button
            className="button p-grid-col5"
            style={{ backgroundColor: "#e8f3ff", color: "#1b64da" }}
          >
            실시간 문의
          </button>
        </Link>
      </div>
    </Page>
  );
}

export default RegularSponsorShipBillingPage;
