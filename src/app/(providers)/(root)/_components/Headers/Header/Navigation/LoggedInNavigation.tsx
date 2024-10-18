import clientApi from "@/api/clientSide/api";
import { useModalStore } from "@/zustand/modal.store";
import { useNotifyStore } from "@/zustand/notify.store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CreateFreeMealModal from "../Modals/FreeMealCreateModal";
import LogOutModal from "../Modals/LogOutModal";
import NotifyListModal from "../Modals/NotifyListModal";

interface LoggedInNavigationProps {
  userId: string;
}

function LoggedInNavigation({ userId }: LoggedInNavigationProps) {
  const { activeModal, setActiveModal } = useModalStore();
  const isCheckedNotifyList = useNotifyStore(
    (state) => state.isCheckedNotifyList
  );
  const setIsCheckedNotifyList = useNotifyStore(
    (state) => state.setIsCheckedNotifyList
  );
  const [isHoverOnProfile, setIsHoverOnProfile] = useState(false);
  const queryClient = useQueryClient();
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
    setActiveModal(<LogOutModal />);
  };
  const handleClickLinkToProfile = () => {
    queryClient.invalidateQueries({ queryKey: ["recruits"] });
  };
  const handleClickCreateFreeMeal = () => {
    setActiveModal(<CreateFreeMealModal />);
  };
  const handleClickShowNotifies = () => {
    setActiveModal(<NotifyListModal />);
    setIsCheckedNotifyList(true);
  };

  useEffect(() => {
    if (!activeModal) {
      setIsHoverOnProfile(false);
    }
  }, [isHoverOnProfile, activeModal]);

  return (
    <>
      <li className="w-10 h-10">
        <button onClick={handleClickShowNotifies}>
          <Image
            width={150}
            height={150}
            className="w-10 h-10 rounded-lg"
            src={
              !isCheckedNotifyList
                ? "https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/NewNotify.png?t=2024-10-18T08%3A33%3A22.480Z"
                : "https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/Notify.png"
            }
            alt="notify icon"
          />
        </button>
      </li>
      {isStoreOwner && (
        <li className="w-10 h-10">
          <button onClick={handleClickCreateFreeMeal}>
            <Image
              width={150}
              height={150}
              className="w-10 aspect-square rounded-lg"
              src="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/LinkToFreeMeal%20.png?t=2024-10-15T21%3A07%3A35.956Z"
              alt="create free-meal post icon"
            />
          </button>
        </li>
      )}
      <li className="z-30" onMouseOver={handleHoverOnProfile}>
        <Link
          href={`/profiles?userId=${userId}`}
          onClick={handleClickLinkToProfile}
        >
          <Image
            width={150}
            height={150}
            src={
              profile?.profileImageUrl ||
              "https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/ProfileDefault.png"
            }
            alt="profile image"
            className="w-10 aspect-square object-cover rounded-lg"
          />
        </Link>
      </li>
    </>
  );
}

export default LoggedInNavigation;
