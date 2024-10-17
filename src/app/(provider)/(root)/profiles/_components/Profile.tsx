import serverApi from "@/api/serverSide/api";
import RecruitList from "../../(home)/_components/Recruits/RecruitList";
import ProfileDetails from "./ProfileDetails";
import ProfileSideBar from "./SideBar/ProfileSideBar";

interface ProfileProps {
  userId: string;
}

async function Profile({ userId }: ProfileProps) {
  // 선택한 유저의 프로필
  const profile = await serverApi.profiles.getProfileByUserId(userId!);
  const initialRecruits = await serverApi.recruits.getInfiniteRecruitsByUserId(
    0,
    userId
  );

  return (
    <>
      <div className="flex gap-x-7">
        <div className="flex flex-col gap-y-5">
          <ProfileDetails profile={profile!} showUserId={userId} />
          <RecruitList initialRecruitList={initialRecruits!} userId={userId!} />
        </div>

        <ProfileSideBar profile={profile!} />
      </div>
    </>
  );
}

export default Profile;
