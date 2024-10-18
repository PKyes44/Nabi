import { Tables } from "@/supabase/database.types";
import "dayjs/locale/ko";
import RecruitDetails from "./RecruitDetails";
import Replies from "./Replies/Replies";

interface RecruitProps {
  recruit: Tables<"recruits"> & {
    userProfiles: Tables<"userProfiles">;
  } & {
    replies: (Tables<"replies"> & {
      userProfiles: Tables<"userProfiles">;
    })[];
  };
}

function Recruit({ recruit }: RecruitProps) {
  return (
<<<<<<< HEAD:src/app/(provider)/(root)/(home)/_components/Recruits/Recruit.tsx
    <div className="flex flex-col gap-y-10">
      <RecruitDetails recruit={recruit!} />
      <Replies replies={recruit.replies!} />
=======
    <div className="flex flex-col gap-y-10 relative">
      <RecruitDetails recruit={recruit} />
      <Replies replies={recruit.replies} recruitId={recruit.recruitId} />
>>>>>>> develop:src/app/(providers)/(root)/(home)/_components/Recruits/Recruit.tsx
    </div>
  );
}

export default Recruit;
