import serverApi from "@/api/serverSide/api";
import RecruitList from "../../../(home)/_components/Recruits/RecruitList";
import ProfileDetails from "../ProfileDetails";
import ProfileSideBar from "./ProfileSideBar";

interface ProfileProps {
  userId: string;
}

async function Profile({ userId: showUserId }: ProfileProps) {
  const profile = await serverApi.profiles.getProfileByUserId(showUserId);
  const initialRecruitList =
    await serverApi.recruits.getInfiniteRecruitsByUserId(5, showUserId);

  return (
    <>
      <div className="flex gap-x-7">
        <div className="flex flex-col gap-y-5">
          <ProfileDetails showUserId={showUserId} profile={profile!} />
          <RecruitList
            initialRecruitList={initialRecruitList!}
            userId={showUserId}
          />
        </div>

        <ProfileSideBar profile={profile!} />
      </div>
    </>
  );
}

export default Profile;
