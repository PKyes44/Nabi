"use client";

import clientApi from "@/api/clientSide/api";
import Page from "@/components/Page/Page";
import { useQuery } from "@tanstack/react-query";

interface RecruitDetailPageProps {
  searchParams: {
    recruitId: string;
  };
}

function RecruitDetailPage({ searchParams }: RecruitDetailPageProps) {
  const { data: recruitData } = useQuery({
    queryKey: ["recruits", { searchParams }],
    queryFn: () => clientApi.recruits.getRecruit(searchParams.recruitId),
  });

  return (
    <Page width="lg">
      <h1>{recruitData?.title}</h1>
      <p>{recruitData?.content}</p>
    </Page>
  );
}

export default RecruitDetailPage;
