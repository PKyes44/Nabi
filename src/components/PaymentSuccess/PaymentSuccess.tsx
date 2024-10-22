"use client";

import ButtonGroup from "@/components/Button/ButtonGroup";
import Container from "@/components/Container/Container";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PaymentSuccessProps {
  orderId?: string;
  orderName?: string;
  amount?: number;
  cardNumber?: string;
  approvedAt?: string;
  url: string;
}

function PaymentSuccessComponent({
  orderId,
  orderName,
  amount = 10000,
  cardNumber,
  approvedAt,
  url,
}: PaymentSuccessProps) {
  const router = useRouter();

  const handleClickLinkToProfile = () => {
    router.replace(url);
  };

  return (
    <Container isMain className="pt-10 flex flex-col">
      <div className="flex flex-col items-center bg-white py-9 px-20 rounded-md gap-y-10 w-[800px]">
        <div className="flex items-center gap-x-3">
          <Image
            height={100}
            width={100}
            alt="success payment icon"
            className="w-10"
            src="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/SuccessPayment.png"
          />
          <h2 className="font-extrabold text-2xl text-center">결제 완료</h2>
        </div>
        <div className="w-full flex flex-col gap-y-5 text-black">
          <div className="flex flex-col">
            <span className="font-bold">결제코드</span>
            <span>{orderId}</span>
          </div>

          <div className="flex gap-x-32">
            <div className="flex flex-col">
              <span className="font-bold">결제명</span>
              <span>{orderName}</span>
            </div>
            <div>
              <p className="font-bold">후원금액</p>
              <p>{amount.toLocaleString()}원</p>
            </div>
          </div>

          <div>
            <p className="font-bold">카드번호</p>
            <p>{cardNumber}</p>
          </div>

          <div>
            <p className="font-bold">결제일</p>
            <p>{dayjs(approvedAt).format("YYYY-MM-DD HH:mm:ss")}</p>
          </div>
          <ButtonGroup
            onClick={handleClickLinkToProfile}
            intent="primary"
            textIntent="primary"
            className="ml-auto"
            value="이전화면으로 돌아가기"
          />
        </div>
      </div>
    </Container>
  );
}

export default PaymentSuccessComponent;
