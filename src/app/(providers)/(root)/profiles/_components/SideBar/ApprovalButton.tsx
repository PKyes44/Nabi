"use client";

import clientApi from "@/api/clientSide/api";
import Button from "@/components/Button/Button";
import { Tables } from "@/supabase/database.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Sponsor = Pick<Tables<"sponsorMeets">, "userId" | "status"> & {
  userProfiles: Tables<"userProfiles"> | null;
};
type Recipient = Pick<Tables<"recipientMeets">, "userId" | "status"> & {
  userProfiles: Tables<"userProfiles"> | null;
};

type ApprovalButtonProps = {
  user: Sponsor | Recipient;
  profile: Tables<"userProfiles">;
  recruitId: string;
};

type ApproveType = {
  userId: string;
  recruitId: string;
  role: string;
};

function ApprovalButton({ user, recruitId, profile }: ApprovalButtonProps) {
  const queryClient = useQueryClient();

  const { mutate: approve } = useMutation({
    mutationFn: ({ userId, recruitId, role }: ApproveType) => {
      if (role === "sponsor")
        return clientApi.sponsorMeets.approveSponsor(userId, recruitId);
      if (role === "recipient")
        return clientApi.recipientMeets.approveRecipient(userId, recruitId);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myRecruits", { userId: profile.userId }],
      });
      queryClient.invalidateQueries({
        queryKey: ["recruits", { page: "homepage" }],
      });
    },
  });

  const handleClickApprove = (
    e: React.MouseEvent<HTMLButtonElement>,
    data: ApproveType
  ) => {
    e.preventDefault();
    approve(data);
  };

  return (
    <Button
      intent="primary"
      rounded="sm"
      textIntent="primary"
      className="w-14 !px-0 !py-0.5 border-none bg-black text-white text-sm"
      onClick={(e) =>
        handleClickApprove(e, {
          userId: user.userId,
          recruitId,
          role: user.userProfiles!.role,
        })
      }
    >
      승인
    </Button>
  );
}

export default ApprovalButton;
