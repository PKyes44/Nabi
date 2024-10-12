"use client";

import clientApi from "@/api/clientSide/api";
import Page from "@/components/Page/Page";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

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
  const { mutate: getBillingKey } = useMutation({
    mutationFn: (requestData: {
      customerKey: string;
      authKey: string;
      price: number;
      recipientId: string;
    }) => clientApi.sponsorShip.getBillingKey(requestData),
    onSuccess: (...arg) => {
      console.log("succes:", arg);
    },
    onError: (...arg) => {
      console.log("error: ", arg);
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
    <Page isMain>
      <div className="box_section" style={{ width: "600px" }}>
        <img
          width="100px"
          src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
        />

        <div className="p-grid" style={{ marginTop: "30px" }}>
          <button
            className="button p-grid-col5"
            onClick={() => {
              location.href =
                "https://docs.tosspayments.com/guides/v2/billing/integration";
            }}
          >
            연동 문서
          </button>
          <button
            className="button p-grid-col5"
            onClick={() => {
              location.href = "https://discord.gg/A4fRFXQhRu";
            }}
            style={{ backgroundColor: "#e8f3ff", color: "#1b64da" }}
          >
            실시간 문의
          </button>
        </div>
      </div>
    </Page>
  );
}

export default RegularSponsorShipBillingPage;
