"use client";

import clientApi from "@/api/clientSide/api";
import Page from "@/components/Page/Page";
import { useAuthStore } from "@/zustand/auth.store";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

interface RegularSponsorShipBillingPageProps {
  searchParams: {
    customerKey: string;
    authKey: string;
  };
}

function RegularSponsorShipBillingPage({
  searchParams: { customerKey, authKey },
}: RegularSponsorShipBillingPageProps) {
  const userId = useAuthStore((state) => state.currentUserId);

  const { mutate: getBillingKey } = useMutation({
    mutationFn: () => clientApi.payment.getBillingKey({ customerKey, authKey }),
    onSuccess: (data) => {
      const billingKey = data.billingKey;
    },
    onError: (...arg) => {
      console.log("error: ", arg);
    },
  });

  useEffect(() => {
    getBillingKey();
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
        <div
          className="box_section"
          style={{ width: "600px", textAlign: "left" }}
        >
          <b>Response Data :</b>
          <div id="response" style={{ whiteSpace: "initial" }}>
            {responseData && <pre>{JSON.stringify(responseData, null, 4)}</pre>}
          </div>
        </div>
      </div>
    </Page>
  );
}

export default RegularSponsorShipBillingPage;
