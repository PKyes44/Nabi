"use client";

/* eslint-disable @next/next/no-img-element */
import { Tables } from "@/supabase/database.types";
import { useAuthStore } from "@/zustand/auth.store";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import Link from "next/link";
import ApplyButtons from "./ApplyButtons";
import OthersButton from "./OthersButton";
import RecruitCount from "./RecruitCount";

dayjs.extend(relativeTime);
dayjs.locale("ko");

interface RecruitDetailsProps {
  recruit: Tables<"recruits"> & { userProfiles: Tables<"userProfiles"> };
}

function RecruitDetails({ recruit }: RecruitDetailsProps) {
  const isAuthInitialized = useAuthStore((state) => state.isAuthInitialized);
  const currentUser = useAuthStore((state) => state.currentUser);
  const createdAt = dayjs(recruit.createdAt).fromNow();
  const isPassedDeadLineDate = dayjs().isBefore(recruit.deadLineDate);
  const remainDeadLineDate = dayjs(recruit.deadLineDate).toNow();

  return (
    <section className="p-8 px-6">
      <div className="flex items-center justify-between">
        <Link
          href={`/profiles?userId=${recruit.authorId}`}
          className="flex items-center gap-x-2"
        >
          <Image
            width={300}
            height={300}
            src={
              recruit.userProfiles.profileImageUrl ||
              "https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/BigDefaultProfile.png?t=2024-10-17T21%3A23%3A00.314Z"
            }
            alt="profile image"
            className="w-12 rounded-full aspect-square object-cover border border-gray-100"
          />
          <div className="flex flex-col">
            <span className="font-bold">{recruit.userProfiles.nickname}</span>
            <span className="text-xs text-gray-700">
              {recruit.userProfiles.email}
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-x-2">
          <span className="font-normal text-xs">{createdAt}</span>
          <OthersButton
            authorId={recruit.authorId}
            recruitId={recruit.recruitId}
          />
        </div>
      </div>
      {!isAuthInitialized || !currentUser ? null : (
        <ApplyButtons recruit={recruit} />
      )}

      <article className="flex flex-col gap-y-4 mt-3">
        {/* 제목 */}
        <h2 className="font-bold text-lg">{recruit.title}</h2>

        {/* 내용 */}
        <p className="font-normal text-sm leading-6">{recruit.content}</p>

        {/* 장소, 일시 등 */}
        <section className="flex justify-between">
          <div className="flex gap-x-4">
            <div className="flex gap-x-2 items-center group relative">
              <Image
                width={150}
                height={150}
                className="w-4 aspect-square"
                src="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/BlackIconList/Location.png?t=2024-10-28T07%3A42%3A51.571Z"
                alt="location icon"
              />
              <span className="font-light text-xs">{recruit.region}</span>
              <span className="whitespace-nowrap absolute top-6 left-3 font-normal text-xs invisible group-hover:visible">
                집합 장소
              </span>
            </div>
            <div className="flex gap-x-2 items-center group relative">
              <Image
                width={200}
                height={200}
                className="w-4 aspect-square object-cover"
                src="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/BlackIconList/VolunteeringDate.png"
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
            <RecruitCount recruit={recruit} />
          </div>
          {!isPassedDeadLineDate && (
            <span className="text-red-400 text-xs font-semibold">
              {remainDeadLineDate} 마감됩니다
            </span>
          )}
        </section>
      </article>
    </section>
  );
}

export default RecruitDetails;
