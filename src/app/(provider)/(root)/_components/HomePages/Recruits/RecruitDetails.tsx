import clientApi from "@/api/clientSide/api";
import { Tables } from "@/supabase/database.types";
import { useAuthStore } from "@/zustand/auth.store";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import Link from "next/link";
import CreateRecruitsReply from "../../CreateRecruitsReply";
import Replies from "../../Replies";

interface RecruitDetailsProps {
  recruit: Tables<"recruits">;
}

function RecruitDetails({ recruit }: RecruitDetailsProps) {
  const authorId = useAuthStore((state) => state.currentUserId);

  const { data: profile } = useQuery({
    queryKey: ["userProfiles"],
    queryFn: () => clientApi.profiles.getProfileByUserId(recruit.authorId!),
  });

  return (
    <div>
      {authorId === recruit.authorId && (
        <Link
          href={`recruits/edit/${recruit.recruitId}`}
          className="border border-black text-sm absolute rounded-md py-1 px-2 right-5 top-5 bg-white"
        >
          수정하기
        </Link>
      )}

      <p className="font-bold text-lg mb-5">{recruit.title}</p>
      <p className="mb-5 border-b pb-5">작성자 : {profile?.nickname}</p>
      <p className="mb-5 text-base">{recruit.content}</p>
      <div className="grid grid-cols-2 gap-y-1 text-sm text-black/50 mb-5 border-b border-black pb-5">
        <span>봉사자 모집 인원 : {recruit.maxSponsorRecruits}</span>
        <span>후원 아동 모집 인원 : {recruit.maxRecipientRecruits}</span>
        <span>
          모집 마감 날짜 : {dayjs(recruit.deadLineDate).format("YYYY-MM-DD")}
        </span>
        <span>
          자원 봉사 날짜 :{" "}
          {dayjs(recruit.volunteeringDate).format("YYYY-DD-MM")}
        </span>
        <span>지역 : {recruit.region}</span>
      </div>
      <CreateRecruitsReply recruitId={recruit.recruitId} />
      <Replies recruitId={recruit.recruitId} />
    </div>
  );
}

export default RecruitDetails;
