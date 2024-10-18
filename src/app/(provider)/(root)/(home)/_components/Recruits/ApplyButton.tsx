"use client";

import clientApi from "@/api/clientSide/api";
import ButtonGroup from "@/components/Button/ButtonGroup";
import { useAuthStore } from "@/zustand/auth.store";
import { useQuery } from "@tanstack/react-query";

interface ApplyButtonProps {
  recruitId: string;
  authorId: string;
}

function ApplyButton({ recruitId, authorId }: ApplyButtonProps) {
  // const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.currentUser);

  const { data } = useQuery({
    queryKey: ["sponsorMeets", { userId: user?.userId }],
    queryFn: () => clientApi.sponsorMeets.getRecruitIdByUserId(user?.userId!),
  });

  // const { mutate: insertSponsorMeet } = useMutation<
  //   unknown,
  //   Error,
  //   Database["public"]["Tables"]["sponsorMeets"]["Insert"]
  // >({
  //   mutationFn: (data) => clientApi.sponsorMeets.insertSponsorMeet(data),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["sponsorMeets"] });
  //     alert("신청되었습니다");
  //   },
  //   onError: (e) => {
  //     alert(e.message);
  //   },
  // });

  if (!user?.userId) return null;

  const hasApplied = data?.some(
    (application) => application.recruitId === recruitId
  );

  const handleClickApplyButton = () => {
    // const data = {
    //   recruitId,
    //   userId: user.userId,
    // };
    // insertSponsorMeet(data);
  };

  return (
    <>
      {user.userId !== authorId &&
        (!hasApplied ? (
          <ButtonGroup
            intent="primary"
            textIntent="primary"
            className="ml-auto"
            value="신청하기"
            onClick={handleClickApplyButton}
          />
        ) : (
          <ButtonGroup
            className="ml-auto bg-[#DDDDDD] text-[#999999]"
            value="신청됨"
            disabled
          />
        ))}
    </>
  );
}

export default ApplyButton;
