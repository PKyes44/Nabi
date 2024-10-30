"use client";
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import clientApi from "@/api/clientSide/api";
import { Tables } from "@/supabase/database.types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import ProfileButtons from "./ProfileButtons";

interface ProfileDetailsProps {
  showUserId: string;
  initialProfile: Tables<"userProfiles">;
}

const DEFAULT_PROFILE_IMG =
  "https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/BigDefaultProfile.png?t=2024-10-17T21%3A23%3A00.314Z";

function ProfileDetails({ showUserId, initialProfile }: ProfileDetailsProps) {
  const { data: profile } = useQuery({
    queryKey: ["userProfiles", { showUserId }],
    queryFn: () => clientApi.profiles.getProfileByUserId(showUserId),
    initialData: initialProfile,
  });
  return (
    <section className="w-[850px] aspect-[2.125/1] border border-gray-100 bg-white rounded-lg overflow-hidden">
      {profile?.bgImageUrl ? (
        <Image
          width={100}
          height={100}
          alt="background image"
          src={profile.bgImageUrl}
          className="w-full h-[64%] border border-gray-100 object-cover"
        />
      ) : (
        <div className="w-full h-[64%] bg-yellow-200 border border-gray-100" />
      )}
      <div className="flex flex-row justify-between mx-10 sm:mx-4 sm:-mt-1 -mt-6">
        <article className="h-full flex items-center gap-x-7">
          <Image
            width={300}
            height={300}
            alt="profile image"
            className="w-32 sm:w-12 aspect-square object-cover  rounded-full"
            src={profile?.profileImageUrl || DEFAULT_PROFILE_IMG}
          />
          <div className="flex flex-col">
            <span className="text-2xl font-bold sm:text-xs">
              {profile?.nickname}
            </span>
            <span className="sm:text-xs">
              {profile?.role === "sponsor" ? "후원자" : "후원아동"}
            </span>
          </div>
        </article>
        <ProfileButtons profile={profile!} showUserId={showUserId} />
      </div>
    </section>
  );
}

export default ProfileDetails;
