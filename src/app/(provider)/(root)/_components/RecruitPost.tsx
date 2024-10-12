import { Tables } from "@/supabase/database.types";
import { useAuthStore } from "@/zustand/auth.store";
import Link from "next/link";

interface RecruitPostProps {
  recruit: Tables<"recruits">;
}

function RecruitPost({ recruit }: RecruitPostProps) {
  const authorId = useAuthStore((state) => state.currentUserId);

  const date = (dateString: string) => {
    return dateString.split("T")[0];
  };

  return (
    <li
      key={recruit.recruitId}
      className="bg-white mb-2 p-10 rounded-md relative"
    >
      {authorId === recruit.authorId && (
        <Link
          href={`recruits/edit/${recruit.recruitId}`}
          className="border border-black text-sm absolute rounded-md py-1 px-2 right-5 top-5 bg-white"
        >
          수정하기
        </Link>
      )}

      <p className="font-bold text-lg mb-5">{recruit.title}</p>
      <p className="mb-5 text-base">{recruit.content}</p>
      <div className="grid grid-cols-2 gap-y-1 text-sm text-black/50">
        <span>봉사자 모집 인원 : {recruit.maxSponsorRecruits}</span>
        <span>후원 아동 모집 인원 : {recruit.maxRecipientRecruits}</span>
        <span>모집 마감 날짜 : {date(recruit.deadLineDate)}</span>
        <span>자원 봉사 날짜 : {date(recruit.volunteeringDate)}</span>
        <span>지역 : {recruit.region}</span>
      </div>
    </li>
  );
}

export default RecruitPost;
