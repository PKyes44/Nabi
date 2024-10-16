"use client";

import clientApi from "@/api/clientSide/api";
import Button from "@/components/Button/Button";
import { useAuthStore } from "@/zustand/auth.store";
import { useProfileEditModalStore } from "@/zustand/modals/profileEditModal.store";
import { useRegularSponsorShipModalStore } from "@/zustand/modals/regularSponsorshipModal.store";
import { useQuery } from "@tanstack/react-query";
import RecruitList from "../../../_components/HomePages/Recruits/RecruitList";
import ProfileSideBar from "./ProfileSideBar";

interface ProfileProps {
  userId: string;
}

function Profile({ userId: showUserId }: ProfileProps) {
  const currentUserId = useAuthStore((state) => state.currentUserId);
  const roleType = useAuthStore((state) => state.roleType);
  const setIsRegularSponsorShipModal = useRegularSponsorShipModalStore(
    (state) => state.setIsRegularSponsorShipModal
  );

  const setIsShowProfileEditModal = useProfileEditModalStore(
    (state) => state.setIsShowProfileEditModal
  );

  // 선택한 유저의 프로필
  const { data: profile, isLoading } = useQuery({
    queryKey: ["userProfiles", { showUserId }],
    queryFn: () => clientApi.profiles.getProfileByUserId(showUserId!),
  });

  const handleClickProfileEdit = () => {
    setIsShowProfileEditModal(true);
  };

  const handleClickRegularSponsorShip = () => {
    setIsRegularSponsorShipModal(true);
  };

  if (isLoading || !profile) return <span>프로필 로딩 중 ..</span>;

  return (
    <>
      <div className="flex gap-x-7">
        <div className="flex flex-col gap-y-5">
          <section className="border border-gray-100 w-[900px] h-[400px] bg-white rounded-lg overflow-hidden">
            {profile.bgImageUrl ? (
              <img
                src={profile.bgImageUrl}
                className="w-full h-64 border border-gray-100 object-cover"
              />
            ) : (
              <div className="w-full h-64 bg-yellow-200 border border-gray-100" />
            )}
            <div className="flex flex-row justify-between mx-10">
              <article className="h-full flex items-center gap-x-7">
                {profile.profileImageUrl ? (
                  <img
                    src={profile.profileImageUrl}
                    className="w-36 h-36 rounded-full -mt-12 object-cover"
                  />
                ) : (
                  <div className="w-36 aspect-square bg-white -mt-12  rounded-full overflow-hidden relative border-2 border-white">
                    <div className="w-10 bg-gray-300 aspect-square rounded-full absolute top-8 left-1/2 -translate-x-1/2" />
                    <div className="w-24 bg-gray-300 aspect-square rounded-full absolute top-20 left-1/2 -translate-x-1/2" />
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">{profile.nickname}</span>
                  <span>
                    {profile.role === "sponsor" ? "후원자" : "후원아동"}
                  </span>
                </div>
              </article>
              <article className="self-center -mt-5">
                {currentUserId === profile.userId ? (
                  <Button
                    size="md"
                    className="px-5 py-1.5"
                    intent="primary"
                    textIntent="primary"
                    onClick={handleClickProfileEdit}
                  >
                    프로필 수정
                  </Button>
                ) : null}
                {roleType === "sponsor" && profile.role === "recipient" ? (
                  <Button
                    intent="primary"
                    textIntent="primary"
                    onClick={handleClickRegularSponsorShip}
                    className="px-5 py-1.5 rounded-sm text-base font-bold"
                  >
                    정기 후원
                  </Button>
                ) : null}
              </article>
            </div>
          </section>

          <RecruitList userId={showUserId} />
        </div>

        <ProfileSideBar profile={profile!} />
      </div>
    </>
  );
}

export default Profile;
