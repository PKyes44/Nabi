"use client";

import clientApi from "@/api/clientSide/api";
import PaymentSuccess from "@/components/PaymentSuccess/PaymentSuccess";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface SuccessPageProps {
  searchParams: {
    orderId: string;
    amount: string;
    paymentKey: string;
  };
  params: {
    domain: string;
  };
}

type ResponseData = {
  totalAmount: string;
  orderName: string;
  orderId: string;
  approvedAt: string;
  easyPay: {
    provider: string;
  };
};

function SuccessPage({
  searchParams: { orderId, amount, paymentKey },
  params: { domain },
}: SuccessPageProps) {
  const router = useRouter();
  const [responseData, setResponseData] = useState<ResponseData | null>(null);

  const { mutate: confirm } = useMutation({
    mutationFn: () =>
      clientApi.funds.paymentConfirm({
        orderId,
        amount,
        paymentKey,
        domain: decodeURIComponent(domain),
      }),
    onSuccess: (data) => {
      console.log(data);
      setResponseData(data);
    },
    onError: (error: { code: string; message: string }) => {
      router.replace(`/fail?code=${error.code}&message=${error.message}`);
    },
  });

  useEffect(() => {
    confirm();
  }, []);

  return (
    <PaymentSuccess
      amount={+responseData?.totalAmount!}
      approvedAt={responseData?.approvedAt}
      cardNumber={responseData?.easyPay.provider}
      orderId={responseData?.orderId}
      orderName={responseData?.orderName}
      url="/"
    />
  );
}

export default SuccessPage;
