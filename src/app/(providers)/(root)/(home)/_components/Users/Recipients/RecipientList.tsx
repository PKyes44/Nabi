import clientApi from "@/api/clientSide/api";
import { useQuery } from "@tanstack/react-query";
import User from "../User";

interface RecipientListProps {
  page: number;
}

function RecipientList({ page }: RecipientListProps) {
  const { data: recipients, isLoading } = useQuery({
    queryKey: ["userProfiles"],
    queryFn: () =>
      clientApi.profiles.getProfilesFilterByRoleAndSponsorShipCount(
        "recipient"
      ),
  });

  const startNum = page === 1 ? 0 : (page - 1) * 5;
  const endNum = page === 1 ? 5 : page * 5;

  return (
    <ul className="grid grid-cols-1 grid-rows-5 gap-y-2">
      {recipients?.slice(startNum, endNum).map((recipient) => {
        return (
          <li key={recipient.userId}>
            <User user={recipient!} />
          </li>
        );
      })}
    </ul>
  );
}

export default RecipientList;
