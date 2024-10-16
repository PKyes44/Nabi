import clientApi from "@/api/clientSide/api";
import { Tables } from "@/supabase/database.types";
import { useAuthStore } from "@/zustand/auth.store";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import Link from "next/link";
<<<<<<< HEAD
import Replies from "./Replies/Replies";
=======
import CreateRecruitsReply from "../../CreateRecruitsReply";
import Replies from "../../Replies";
import ApplyButton from "./ApplyButton";
>>>>>>> dd1f9ec6d793b30c028287d88f74bb2af77d6d31

interface RecruitDetailsProps {
  recruit: Tables<"recruits">;
}

function RecruitDetails({ recruit }: RecruitDetailsProps) {
  const userId = useAuthStore((state) => state.currentUserId);
  const roleType = useAuthStore((state) => state.roleType);
  const authorId = recruit.authorId;

  const createdAt =
    Math.abs(dayjs(recruit.createdAt).diff(dayjs(), "hours")) !== 0
      ? Math.abs(dayjs(recruit.createdAt).diff(dayjs(), "hours")) + "시간 전"
      : Math.abs(dayjs(recruit.createdAt).diff(dayjs(), "minutes")) + "분 전";

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
        <span className="font-normal text-xs">{createdAt}</span>
      </div>
      <article className="flex flex-col gap-y-3">
        <ApplyButton recruitId={recruit.recruitId} />
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
      <Replies recruitId={recruit.recruitId} />
    </div>
  );
}

export default RecruitDetails;
