import clientApi from "@/api/clientSide/api";
import { Tables } from "@/supabase/database.types";
import { WithProfiles } from "@/types/profiles.types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

type RecruitListHookProps = (WithProfiles<Tables<"recruits">> & {
  replies: WithProfiles<Tables<"replies">>[];
})[];

function useRecruitList(initialRecruitList: RecruitListHookProps) {
  const observerRef = useRef(null);

  const {
    data: recruitsData,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery({
    initialData: { pages: [initialRecruitList || []], pageParams: [0] },
    queryKey: ["recruits", { page: "homepage" }],
    queryFn: ({ pageParam }) =>
      clientApi.recruits.getInfiniteRecruits(pageParam),
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage) return;
      if (!pages) return;

      return pages.length;
    },
    initialPageParam: 0,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    const currentObserver = observerRef.current;
    if (currentObserver) {
      observer.observe(currentObserver);
    }

    return () => {
      if (currentObserver) {
        observer.unobserve(currentObserver);
      }
    };
  }, [isLoading, hasNextPage, fetchNextPage]);

  return { recruitsData, isLoading, observerRef };
}

export default useRecruitList;
