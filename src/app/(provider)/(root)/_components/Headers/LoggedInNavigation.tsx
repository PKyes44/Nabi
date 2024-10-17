import clientApi from "@/api/clientSide/api";
import { useLogOutModal } from "@/zustand/logOutModal.store";
import { useFreeMealCreateModalStore } from "@/zustand/modals/freeMealCreateModal.store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";

interface LoggedInNavigationProps {
  userId: string;
}

function LoggedInNavigation({ userId }: LoggedInNavigationProps) {
  const [isHoverOnProfile, setIsHoverOnProfile] = useState(false);
  const queryClient = useQueryClient();
  const { isShowLogOutModal, setIsShowLogOutModal } = useLogOutModal();
  const setIsFreeMealCreateModal = useFreeMealCreateModalStore(
    (state) => state.setIsFreeMealCreateModal
  );
  const { data: isStoreOwner } = useQuery({
    queryKey: ["storeOwners"],
    queryFn: () => clientApi.storeOwners.isStoreOwnerByUserId(userId),
  });
  const { data: profile } = useQuery({
    queryKey: ["userProfiles", { userId }],
    queryFn: () => clientApi.profiles.getProfileByUserId(userId),
  });

  const handleHoverOnProfile = () => {
    setIsHoverOnProfile(true);
    setIsShowLogOutModal(true);
  };
  const handleClickLinkToProfile = () => {
    queryClient.invalidateQueries({ queryKey: ["recruits"] });
  };
  const handleClickCreateFreeMeal = () => {
    setIsFreeMealCreateModal(true);
  };

  useEffect(() => {
    console.log(userId);
    if (!isShowLogOutModal) {
      setIsHoverOnProfile(false);
    }
  }, [isShowLogOutModal, isHoverOnProfile]);

  return (
    <>
      {isStoreOwner && (
        <li className="w-10">
          <button onClick={handleClickCreateFreeMeal}>
            <img
              className="w-full aspect-square rounded-lg"
              src="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/LinkToFreeMeal%20.png?t=2024-10-15T21%3A07%3A35.956Z"
              alt="create free-meal post icon"
            />
          </button>
        </li>
      )}
      <li className="w-10 z-30 relative" onMouseOver={handleHoverOnProfile}>
        <Link
          href={`/profiles?userId=${userId}`}
          onClick={handleClickLinkToProfile}
        >
          {profile?.profileImageUrl ? (
            <img
              src={profile.profileImageUrl}
              alt="profile image"
              className="w-full aspect-square object-cover rounded-lg"
            />
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
    </>
  );
}

export default LoggedInNavigation;
