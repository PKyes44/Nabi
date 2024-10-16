"use client";

import clientApi from "@/api/clientSide/api";
import ButtonGroup from "@/components/Button/ButtonGroup";
import Page from "@/components/Page/Page";
import { PaymentResponse } from "@/types/paymentResponse.types";
import { useMutation } from "@tanstack/react-query";
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

  console.log(receipt); //

  return (
    <Page isMain className="pt-10 flex flex-col">
      <div className="flex flex-col items-center bg-white py-9 px-20 rounded-md gap-y-10 w-[800px]">
        <div className="flex items-center gap-x-3">
          <img
            width="40px"
            src="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/SuccessPayment.png"
          />
          <h2 className="font-extrabold text-2xl text-center">결제 완료</h2>
        </div>
        <div className="w-full flex flex-col gap-y-5 text-black">
          <div>
            <p className="font-bold">결제코드</p>
            <p>0dcdafba-bcb4-4361-a24e-ffc044781aea</p>
          </div>

          <div className="flex gap-x-10">
            <div>
              <p className="font-bold">결제명</p>
              <p>나비 : 익명의 후원자1님의 정기후원</p>
            </div>
            <div>
              <p className="font-bold">후원금액</p>
              <p>10,000원</p>
            </div>
          </div>

          <div>
            <p className="font-bold">카드번호</p>
            <p>3212-****-****-***5</p>
          </div>

          <div>
            <p className="font-bold">결제일</p>
            <p>2024-10-19 02:01</p>
          </div>
          <ButtonGroup
            intent="primary"
            textIntent="primary"
            className="ml-auto"
            value="프로필로 돌아가기"
          />
        </div>
      </div>
    </Page>
  );
}

export default RegularSponsorShipBillingPage;
