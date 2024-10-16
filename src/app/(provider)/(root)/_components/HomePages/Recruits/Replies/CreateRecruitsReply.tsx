"use client";
import clientApi from "@/api/clientSide/api";
import Button from "@/components/Button/Button";
import InputGroup from "@/components/Inputs/InputGroup";
import { Database } from "@/supabase/database.types";
import { CustomFormEvent } from "@/types/formEvent.types";
import { useAuthStore } from "@/zustand/auth.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ComponentProps } from "react";

interface SubmitReplyForm {
  content: HTMLInputElement;
}

type SubmitReplyFormEvent = CustomFormEvent<SubmitReplyForm>;

function CreateRecruitsReply({ recruitId }: { recruitId: string }) {
  const queryClient = useQueryClient();
  const recipientId = useAuthStore((state) => state.currentUserId);

  const { data: recipient } = useQuery({
    queryKey: ["sponsorMeets", { recruitId }],
    queryFn: () => clientApi.sponsorMeets.getRecipientByUserId(recruitId),
  });

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

  const handleSubmitReplyForm: ComponentProps<"form">["onSubmit"] = (
    e: SubmitReplyFormEvent
  ) => {
    e.preventDefault();
    const content = e.target.content.value;

    if (!content) return;

    const data = {
      content,
      recruitId,
      recipientId,
    };

    editReply(data);
    e.target.content.value = "";
  };

  if (recipient && recipient.userProfiles!.role === "recipient")
    return (
      <div className=" pb-5 mb-5 text-xs flex items-center mt-4 gap-x-3">
        {recipient.userProfiles?.profileImageUrl ? (
          <img
            src={recipient.userProfiles?.profileImageUrl}
            alt="profile image"
            className="w-7 aspect-square object-cover rounded-full"
          />
        ) : (
          <img
            src="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/ProfileDefault.png"
            alt=""
            className="w-7 aspect-square object-cover rounded-full"
          />
        )}
        <form className="relative" onSubmit={handleSubmitReplyForm}>
          <InputGroup
            type="text"
            name="content"
            intent="comment"
            wrapperClassName="grow"
            innerClassName="pr-10"
            placeholder="댓글을 입력해주세요"
          />
          <Button className="absolute top-1/4 right-3" intent="none" size="xs">
            <img
              src="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/Send.png?t=2024-10-15T20%3A30%3A14.946Z"
              alt="send icon"
            />
          </Button>
        </form>
      </div>
    );
}

export default CreateRecruitsReply;
