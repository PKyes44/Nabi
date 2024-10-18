import clientApi from "@/api/clientSide/api";
import ButtonGroup from "@/components/Button/ButtonGroup";
import { Database } from "@/supabase/database.types";
import { useAuthStore } from "@/zustand/auth.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface ApplyToRecipientButtonProps {
  recruitId: string;
  authorId: string;
}

function ApplyToRecipientButton({
  recruitId,
  authorId,
}: ApplyToRecipientButtonProps) {
  const queryClient = useQueryClient();
  const currentUser = useAuthStore((state) => state.currentUser);
  const userId = currentUser?.userId;

  const { data: recipientMeets } = useQuery({
    queryKey: ["recipientMeets"],
    queryFn: () => clientApi.recipientMeets.getRecipientMeets(),
  });

  const { mutate: insertRecipientMeet } = useMutation<
    unknown,
    Error,
    Database["public"]["Tables"]["recipientMeets"]["Insert"]
  >({
    mutationFn: (data) => clientApi.recipientMeets.insertRecipientMeets(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipientMeets"] });
      alert("작성자가 승인을 하면 신청이 완료됩니다.");
    },
    onError: (e) => {
      alert(e.message);
    },
  });

  const userStatus = recipientMeets?.find(
    (recipientMeet) =>
      recipientMeet.recruitId === recruitId && recipientMeet.userId === userId
  );

  if (!userId) return null;

  const handleClickApplyButton = () => {
    const data = {
      recruitId,
      userId,
      status: "pending",
    };

    insertRecipientMeet(data);
  };

  return (
    <>
      {userId !== authorId && (
        <>
          {userStatus ? (
            userStatus.status === "pending" ? (
              <ButtonGroup
                intent="disabled"
                textIntent="black"
                value="승인 확인 중"
                className="ml-auto"
                disabled
              />
            ) : userStatus.status === "approved" ? (
              <ButtonGroup
                intent="disabled"
                textIntent="black"
                value="승인됨"
                className="ml-auto"
                disabled
              />
            ) : userStatus.status === "rejected" ? (
              <ButtonGroup
                intent="disabled"
                textIntent="black"
                value="거절됨"
                className="ml-auto"
                disabled
              />
            ) : null
          ) : (
            <ButtonGroup
              onClick={handleClickApplyButton}
              intent="primary"
              textIntent="primary"
              className="ml-auto"
              value="후원 요청 하기"
            />
          )}
        </>
      )}
    </>
  );
}

export default ApplyToRecipientButton;
