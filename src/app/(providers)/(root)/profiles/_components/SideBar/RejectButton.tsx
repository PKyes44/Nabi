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

type RejectButtonProps = {
  user: Sponsor | Recipient;
  profile: Tables<"userProfiles">;
  recruitId: string;
};

type ApproveType = {
  userId: string;
  recruitId: string;
  role: string;
};

function RejectButton({ user, recruitId, profile }: RejectButtonProps) {
  const queryClient = useQueryClient();

  const { mutate: reject } = useMutation({
    mutationFn: ({ userId, recruitId, role }: ApproveType) => {
      if (role === "sponsor")
        return clientApi.sponsorMeets.rejectSponsor(userId, recruitId);
      if (role === "recipient")
        return clientApi.recipientMeets.rejectRecipient(userId, recruitId);
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

  const handleClickReject = (
    e: React.MouseEvent<HTMLButtonElement>,
    data: ApproveType
  ) => {
    e.preventDefault();
    reject(data);
  };

  return (
    <Button
      intent="primary"
      rounded="sm"
      textIntent="primary"
      className="w-14 !px-0 !py-0.5 border-none bg-red-500/100 text-white text-sm"
      onClick={(e) =>
        handleClickReject(e, {
          userId: user.userId,
          recruitId,
          role: user.userProfiles!.role,
        })
      }
    >
      거절
    </Button>
  );
}

export default RejectButton;
