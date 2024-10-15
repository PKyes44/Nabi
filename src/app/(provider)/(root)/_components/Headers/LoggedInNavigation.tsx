import clientApi from "@/api/clientSide/api";
import { supabase } from "@/supabase/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface LoggedInNavigationProps {
  userId: string;
}

function LoggedInNavigation({ userId }: LoggedInNavigationProps) {
  const { data: isStoreOwner, isLoading } = useQuery({
    queryKey: ["storeOwners"],
    queryFn: () => clientApi.storeOwners.isStoreOwnerByUserId(userId),
  });
  const { data: profile, isLoading: isUserProfileLoading } = useQuery({
    queryKey: ["userProfiles", { userId }],
    queryFn: () => clientApi.profiles.getProfileByUserId(userId),
  });

  const handleClickLogOut = async () => {
    await supabase.auth.signOut();
  };

  if (isLoading || isUserProfileLoading) return <span>데이터 불러오는 중</span>;
  return (
    <>
      <li className="w-10">
        <Link href="/free-meals/map">
          <img
            className="w-full aspect-square rounded-lg"
            src="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/LinkToMap.png?t=2024-10-15T21%3A06%3A46.454Z"
            alt="link to free-meals store map"
          />
        </Link>
      </li>
      {isStoreOwner && (
        <li className="w-10">
          <Link href="free-meals/new">
            <img
              className="w-full aspect-square rounded-lg"
              src="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/LinkToFreeMeal%20.png?t=2024-10-15T21%3A07%3A35.956Z"
              alt="create free-meal post icon"
            />
          </Link>
        </li>
      )}
      <li className="w-10">
        <Link href={`/profiles?userId=${userId}`}>
          {profile?.profileImageUrl ? (
            <img src={profile.profileImageUrl} alt="profile image" />
          ) : (
            <div className="bg-[#f5f5f5] w-full aspect-square rounded-lg grid place-items-center">
              <img
                className="w-7/12 aspect-square rounded-lg"
                src="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/ProfileDefault.png"
                alt="default profile image"
              />
            </div>
          )}
        </Link>
      </li>
      <li>
        <button onClick={handleClickLogOut}>로그아웃</button>
      </li>
    </>
  );
}

export default LoggedInNavigation;
