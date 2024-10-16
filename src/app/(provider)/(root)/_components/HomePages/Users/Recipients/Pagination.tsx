import clientApi from "@/api/clientSide/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface PaginationProps {
  page: number;
}

function Pagination({ page }: PaginationProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: navigationCount } = useQuery({
    queryKey: ["userProfiles", { type: "recipientCount" }],
    queryFn: () => clientApi.profiles.getNavigationCount("recipient"),
  });

  const handleClickNavigation = (page: number) => {
    queryClient.invalidateQueries({
      queryKey: ["userProfiles", { role: "recipient" }],
    });
    router.push(`?page=${page}`);
  };

  return (
    <nav className="m-auto text-sm">
      <ul className="flex gap-x-2">
        {Array.from({ length: navigationCount! }).map((_, index) => {
          return (
            <li
              key={index}
              className={`${
                index + 1 == +page
                  ? "font-bold text-black"
                  : "font-light text-gray-500"
              }`}
            >
              <button onClick={() => handleClickNavigation(index + 1)}>
                {index + 1}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Pagination;
