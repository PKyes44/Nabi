import clientApi from "@/api/clientSide/api";
import { supabase } from "@/supabase/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface LoggedInNavigationProps {
  userId: string;
}

function LoggedInNavigation({ userId }: LoggedInNavigationProps) {
  const { data: isStoreOwner, isLoading } = useQuery({
    queryKey: ["storeOwners"],
    queryFn: () => clientApi.storeOwners.isStoreOwnerByUserId(userId),
  });

  const handleClickLogOut = async () => {
    await supabase.auth.signOut();
  };

  if (isLoading) return <span>데이터 불러오는 중</span>;
  return (
    <>
      <li>
        <Link href="/free-meals/map">매장지도보기</Link>
      </li>
      {isStoreOwner && (
        <li>
          <Link href="free-meals/new">무상식사 제공하기</Link>
        </li>
      )}
      <li>
        <Link href={`/profiles?userId=${userId}`}>프로필</Link>
      </li>
      <li>
        <button onClick={handleClickLogOut}>로그아웃</button>
      </li>
    </>
  );
}

export default LoggedInNavigation;
