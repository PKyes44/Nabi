import clientApi from "@/api/clientSide/api";
import { Tables } from "@/supabase/database.types";
import { useAuthStore } from "@/zustand/auth.store";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import Link from "next/link";
import CreateRecruitsReply from "../../CreateRecruitsReply";
import Replies from "../../Replies";

interface RecruitDetailsProps {
  recruit: Tables<"recruits">;
}

function RecruitDetails({ recruit }: RecruitDetailsProps) {
  const userId = useAuthStore((state) => state.currentUserId);
  const roleType = useAuthStore((state) => state.roleType);
  const authorId = recruit.authorId;

  const { data: profile } = useQuery({
    queryKey: ["userProfiles", { authorId }],
    queryFn: () => clientApi.profiles.getProfileByUserId(authorId!),
  });

  return (
    <div className="flex flex-col gap-y-10">
      {userId === recruit.authorId && (
        <Link
          href={`recruits/edit/${recruit.recruitId}`}
          className="border border-black text-sm absolute rounded-md py-1 px-2 right-5 top-5 bg-white"
        >
          수정하기
        </Link>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-5 ">
          {profile?.profileImageUrl ? (
            <img
              src={profile.profileImageUrl}
              alt="profile image"
              className="w-16 rounded-full aspect-square object-cover"
            />
          ) : (
            <div className="w-16 rounded-full aspect-square object-cover" />
          )}
          <div className="flex flex-col">
            <span className="font-extrabold">{profile?.nickname}</span>
            <span className="font-light text-xs">{profile?.email}</span>
          </div>
        </div>
        <span className="font-normal text-xs">
          {Math.abs(dayjs(recruit.createdAt).diff(dayjs(), "hours"))}시간 전
        </span>
      </div>
      <article className="flex flex-col gap-y-3">
        <h2 className="font-bold text-lg">{recruit.title}</h2>
        <p className="font-normal text-sm mb-5">{recruit.content}</p>
        <div className="flex gap-x-4">
          <div className="flex gap-x-2 items-center group relative">
            <img
              src="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/Location.png?t=2024-10-15T19%3A39%3A08.745Z"
              alt="location icon"
            />
            <span className="font-light text-xs">{recruit.region}</span>
            <span className="whitespace-nowrap absolute top-6 left-3 font-normal text-xs invisible group-hover:visible">
              집합 장소
            </span>
          </div>
          <div className="flex gap-x-2 items-center group relative">
            <img
              src="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/Date.png"
              alt="date icon"
            />
            <span className="font-light text-xs">
              {dayjs(recruit.volunteeringDate)
                .locale("ko")
                .format("YYYY-MM-DD (ddd) HH:mm")}
            </span>
            <span className="whitespace-nowrap absolute top-6 left-1/3 font-normal text-xs invisible group-hover:visible">
              봉사활동 일시
            </span>
          </div>
          <div className="flex gap-x-2 items-center group relative">
            <img
              src="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/RecruitCount.png?t=2024-10-15T19%3A45%3A09.027Z"
              alt="recruit count icon"
            />
            <span className="font-light text-xs">
              {roleType === "sponsor"
                ? recruit.maxSponsorRecruits
                : recruit.maxRecipientRecruits}
              명
            </span>
            <span className="whitespace-nowrap absolute top-6 -left-1/2 font-normal text-xs invisible group-hover:visible">
              {roleType === "sponsor" ? "후원자 모집인원" : "후원아동 모집인원"}
            </span>
          </div>
        </div>
      </article>
      <article className="mt-2">
        <div className="flex gap-x-3 items-center">
          <div className="flex gap-x-2 items-center">
            <img
              src="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/Comments.png"
              alt="comments icon"
            />
            <span className="font-light text-xs">댓글 더보기 (+99)</span>
          </div>
          <div className="flex gap-x-2 items-center">
            <img
              src="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/ThumbsUp.png?t=2024-10-15T19%3A56%3A31.548Z"
              alt="thumbs up icon"
            />
            <span className="font-light text-xs">좋아요 (56)</span>
          </div>
        </div>
        <CreateRecruitsReply recruitId={recruit.recruitId} />
        <Replies recruitId={recruit.recruitId} />
      </article>
    </div>
  );
}

export default RecruitDetails;
