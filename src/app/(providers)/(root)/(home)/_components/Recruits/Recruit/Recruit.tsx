import { RecruitItem } from "@/types/recruits.types";
import "dayjs/locale/ko";
import Replies from "../../Replies/Replies";
import RecruitDetails from "../RecruitDetails/RecruitDetails";

interface RecruitProps {
  recruit: RecruitItem;
}

function Recruit({ recruit }: RecruitProps) {
  return (
    <div className="bg-white mb-2 border rounded-md relative">
      <article className="grid grid-cols-1">
        <RecruitDetails recruit={recruit!} />

        <Replies recruitId={recruit.recruitId} replies={recruit.replies} />
      </article>
    </div>
  );
}

export default Recruit;
