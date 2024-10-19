"use client";

import clientApi from "@/api/clientSide/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

interface PaginationProps {
  page: number;
}

function Pagination({ page }: PaginationProps) {
  const queryClient = useQueryClient();
  const { data: navigationCount } = useQuery({
    queryKey: ["userProfiles", { type: "recipientCount" }],
    queryFn: () => clientApi.profiles.getNavigationCount("recipient"),
  });

  const handleClickNavigation = () => {
    queryClient.invalidateQueries({
      queryKey: ["userProfiles", { role: "recipient" }],
    });
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
              <Link
                href={`?page=${index + 1}`}
                onClick={() => handleClickNavigation()}
              >
                {index + 1}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Pagination;
