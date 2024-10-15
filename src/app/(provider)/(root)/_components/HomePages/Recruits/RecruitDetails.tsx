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
  const userId = useAuthStore((state) => state.currentUserId);

  const { data: profile } = useQuery({
    queryKey: ["userProfiles"],
    queryFn: () => clientApi.profiles.getProfileByUserId(recruit.authorId!),
  });

  const { data: userProfile } = useQuery({
    queryKey: ["userProfiles", { userId }],
    queryFn: () => clientApi.profiles.getProfileByUserId(userId!),
  });

  return (
    <div>
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
      <article></article>
      <div className="grid grid-cols-2 gap-y-1 text-sm text-black/50 mb-5 border-b border-black pb-5"></div>
      <CreateRecruitsReply recruitId={recruit.recruitId} />
      <Replies recruitId={recruit.recruitId} />
    </div>
  );
}

export default RecruitDetails;
