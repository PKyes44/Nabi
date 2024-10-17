import clientApi from "@/api/clientSide/api";
import RecruitList from "../../_components/HomePages/Recruits/RecruitList";
import ProfileSection from "./ProfileSection";
import ProfileSideBar from "./ProfileSideBar";

interface ProfileProps {
  showUserId: string;
}

async function Profile({ showUserId }: ProfileProps) {
  // 선택한 유저의 프로필
  const profile = await clientApi.profiles.getProfileByUserId(showUserId!);
  const initialRecruits = await clientApi.recruits.getInfiniteRecruitsByUserId(
    0,
    showUserId
  );

  return (
    <>
      <div className="flex gap-x-7">
        <div className="flex flex-col gap-y-5">
          <ProfileSection profile={profile!} showUserId={showUserId} />
          <RecruitList
            initialRecruits={initialRecruits}
            showUserId={showUserId}
          />
        </div>

        <ProfileSideBar profile={profile!} />
      </div>
    </>
  );
}

export default Profile;
