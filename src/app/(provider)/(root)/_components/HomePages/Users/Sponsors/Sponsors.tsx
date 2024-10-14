import clientApi from "@/api/clientSide/api";
import { useQuery } from "@tanstack/react-query";
import User from "../User";

function Sponsors() {
  const { data: sponsors, isLoading } = useQuery({
    queryKey: ["userProfiles", { role: "sponsor" }],
    queryFn: () =>
      clientApi.profiles.getProfilesFilterByRoleAndSponsorShipCount("sponsor"),
  });

  if (isLoading) return <span>데이터 불러오는 중 ...</span>;

  return (
    <ul className="grid grid-cols-1 grid-rows-5 gap-y-2">
      {sponsors!.slice(0, 5).map((sponsor) => {
        return (
          <li key={sponsor.userId}>
            <User user={sponsor} />
          </li>
        );
      })}
    </ul>
  );
}

export default Sponsors;
