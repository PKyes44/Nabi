"use client";
import { Tables } from "@/supabase/database.types";
import Image from "next/image";
import { useState } from "react";
import ApprovalButton from "./ApprovalButton";
import RejectButton from "./RejectButton";

type Sponsor = Pick<Tables<"sponsorMeets">, "userId" | "status"> & {
  userProfiles: Tables<"userProfiles"> | null;
};
type Recipient = Pick<Tables<"recipientMeets">, "userId" | "status"> & {
  userProfiles: Tables<"userProfiles"> | null;
};

type DecisionButtonProps = {
  user: Sponsor | Recipient;
  profile: Tables<"userProfiles">;
  recruitId: string;
};

const DECISION_ICON =
  "https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/Others.svg";

function DecisionButton(props: DecisionButtonProps) {
  const [isShowDecision, setIsShownOthers] = useState(false);

  const handleToggleDecision = () => {
    setIsShownOthers(!isShowDecision);
  };
  return (
    <div className="flex flex-col items-center justify-center relative">
      <button onClick={handleToggleDecision}>
        <Image
          src={DECISION_ICON}
          width={150}
          height={150}
          className="w-4 aspect-square"
          alt="decision"
          onClick={(e) => e.preventDefault()}
        />
      </button>
      {isShowDecision && (
        <div className="left-5 flex gap-x-2 absolute z-20 bg-white rounded-md shadow-md p-3">
          <ApprovalButton {...props} />
          <RejectButton {...props} />
        </div>
      )}
    </div>
  );
}

export default DecisionButton;
