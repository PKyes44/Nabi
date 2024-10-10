import Page from "@/components/Page/Page";
import Link from "next/link";

interface SelectRolePageProps {
  searchParams: {
    type: string;
  };
}

function SelectRolePage({ searchParams: { type } }: SelectRolePageProps) {
  const baseHref = type === "log-in" ? "/auth/log-in" : "/auth/sign-up";

  return (
    <Page width="sm" className="flex gap-x-10 items-center justify-center">
      <Link
        href={baseHref + "?role=recipient"}
        className="w-72 aspect-square bg-yellow-200 rounded-xl p-5 pt-10 pb-2"
      >
        <article className="flex flex-col justify-between gap-y-10">
          <div className="bg-yellow-50 w-48 h-32 m-auto rounded-lg" />
          <span className="text-center">후원아동</span>
        </article>
      </Link>
      <Link
        href={baseHref + "?role=sponser"}
        className="w-72 aspect-square bg-yellow-200 rounded-xl p-5 pt-10 pb-2"
      >
        <article className="flex flex-col justify-between gap-y-10">
          <div className="bg-yellow-50 w-48 h-32 m-auto rounded-lg" />
          <span className="text-center">후원자</span>
        </article>
      </Link>
    </Page>
  );
}

export default SelectRolePage;
