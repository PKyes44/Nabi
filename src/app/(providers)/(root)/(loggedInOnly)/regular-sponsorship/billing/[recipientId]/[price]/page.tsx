"use client";

import clientApi from "@/api/clientSide/api";
import PaymentSuccess from "@/components/PaymentSuccess/PaymentSuccess";
import { PaymentResponse } from "@/types/paymentResponse.types";
import { useAuthStore } from "@/zustand/auth.store";
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
  const user = useAuthStore((state) => state.currentUser);

  const { mutate: addRegularSponsorShipTable } = useMutation({
    mutationFn: () => {
      if (!user) return Promise.resolve();

      const data = {
        sponsorId: user.userId,
        recipientId,
      };
      return clientApi.regularSponsorShip.addRegularSponsorship(data);
    },
  });

  const { mutate: getBillingKey } = useMutation({
    mutationFn: (requestData: {
      customerKey: string;
      authKey: string;
      price: number;
      recipientId: string;
    }) => clientApi.regularSponsorShip.getBillingKey(requestData),
    onSuccess: (responseData: PaymentResponse) => {
      console.log("success:", responseData);
      setReceipt(responseData);
      addRegularSponsorShipTable();
    },
    onError: (data: { message: string; code: string }) => {
      console.log("error: ", data);
      router.replace(`/fail?code=${data.code}&message=${data.message}`);
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
    <PaymentSuccess
      url={`/profile?userId=${recipientId}`}
      orderId={receipt?.orderId!}
      orderName={receipt?.orderName!}
      amount={+receipt?.amount!}
      approvedAt={receipt?.approvedAt!}
      cardNumber={receipt?.card.number!}
    />
  );
}

export default RegularSponsorShipBillingPage;
