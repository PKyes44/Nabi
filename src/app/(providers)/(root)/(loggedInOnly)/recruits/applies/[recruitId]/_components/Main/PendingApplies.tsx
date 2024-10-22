import { Tables } from "@/supabase/database.types";
import { WithProfiles } from "@/types/profiles.types";
import PendingApply from "./PendingApply";

interface PendingAppliesProps {
  title: string;
  pendingApplies: WithProfiles<
    Tables<"sponsorMeets"> | Tables<"recipientMeets">
  >[];
  recruitId: string;
}

function PendingApplies({
  title,
  pendingApplies,
  recruitId,
}: PendingAppliesProps) {
  return (
    <article
      className={`${
        title === "후원자" ? "border-r" : "border-l"
      } border-gray-200`}
    >
      <h2 className="text-center font-bold text-lg">{title}</h2>
      <ul className={title === "후원자" ? "pr-7" : "pl-7"}>
        {pendingApplies?.map((user) => (
          <li key={user.meetId} className="flex items-center space-x-2">
            <PendingApply
              recruitId={recruitId}
              userProfile={user.userProfiles}
            />
          </li>
        ))}
      </ul>
    </article>
  );
}

export default PendingApplies;
