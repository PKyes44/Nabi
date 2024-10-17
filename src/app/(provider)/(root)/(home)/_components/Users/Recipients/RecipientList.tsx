import serverApi from "@/api/serverSide/api";
import User from "../User";

interface RecipientListProps {
  page: number;
}

async function RecipientList({ page }: RecipientListProps) {
  const recipients =
    await serverApi.profiles.getProfilesFilterByRoleAndSponsorShipCount(
      "recipient"
    );
  const startNum = page === 1 ? 0 : (page - 1) * 5 + 1;
  const endNum = page === 1 ? 5 : page * 5;

  return (
    <ul className="grid grid-cols-1 grid-rows-5 gap-y-2">
      {recipients?.slice(startNum, endNum).map((recipient) => {
        return (
          <li key={recipient.userId}>
            <User user={recipient} />
          </li>
        );
      })}
    </ul>
  );
}

export default RecipientList;
