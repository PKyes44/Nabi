"use client";
import clientApi from "@/api/clientSide/api";
import ButtonGroup from "@/components/Button/ButtonGroup";
import InputGroup from "@/components/Inputs/InputGroup";
import { Database } from "@/supabase/database.types";
import { CustomFormEvent } from "@/types/formEvent.types";
import { useAuthStore } from "@/zustand/auth.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ComponentProps, useState } from "react";

interface InitialErrMsgs {
  content: string | null;
}
const initialErrMsgs = {
  content: null,
};

interface SubmitReplyForm {
  content: HTMLInputElement;
}

type SubmitReplyFormEvent = CustomFormEvent<SubmitReplyForm>;

function CreateRecruitsReply({ recruitId }: { recruitId: string }) {
  const queryClient = useQueryClient();
  const recipientId = useAuthStore((state) => state.currentUserId);
  const currentUserId = useAuthStore((state) => state.currentUserId);
  const [errMsgs, setErrMsgs] = useState<InitialErrMsgs>(initialErrMsgs);

  const { data: recipients } = useQuery({
    queryKey: ["sponsorMeets", { recruitId }],
    queryFn: () => clientApi.sponsorMeets.getRecipients(recruitId),
  });

  // sponsorMeets에 recruitId와 자신의 userId를 넣어 isApproved가 true이고,
  // isSponsor가 false일 때만 댓글 작성

  // 만들기
  const { mutate: editReply } = useMutation<
    unknown,
    Error,
    Database["public"]["Tables"]["replies"]["Insert"]
  >({
    mutationFn: (data) => clientApi.replies.createReply(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["replies"] });
    },
    onError: (e) => {
      alert(e.message);
    },
  });

  if (!recipientId) return null;

  const throwErrMsgs = (type: string, message: string) => {
    setErrMsgs((prevErrMsgs) => ({ ...prevErrMsgs, [type]: message }));
  };

  const handleSubmitReplyForm: ComponentProps<"form">["onSubmit"] = (
    e: SubmitReplyFormEvent
  ) => {
    e.preventDefault();
    const content = e.target.content.value;

    if (!content) return throwErrMsgs("content", "내용을 입력해주세요");

    const data = {
      content,
      recruitId,
      recipientId,
    };

    editReply(data);
    e.target.content.value = "";
  };

  if (recipients?.some((recipient) => recipient.userId === currentUserId))
    return (
      <div className="w-full border-b border-black pb-5 mb-5">
        <form onSubmit={handleSubmitReplyForm}>
          <InputGroup
            label="댓글 남기기"
            type="text"
            name="content"
            errorText={errMsgs.content}
          />
          <ButtonGroup className="mt-2" value="등록" type="submit" />
        </form>
      </div>
    );
}

export default CreateRecruitsReply;
