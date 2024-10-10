import Page from "@/components/Page/Page";
import Link from "next/link";
import { FaChildren } from "react-icons/fa6";
import { MdVolunteerActivism } from "react-icons/md";

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
        className="w-72 aspect-square bg-white border border-gray-500 rounded-xl p-5 pt-10 pb-2"
      >
        <article className="flex flex-col justify-between gap-y-8">
          <div className=" w-44 h-32 m-auto rounded-lg grid place-content-center">
            <FaChildren size={80} color="#555555" />
          </div>
          <span className="text-center font-extrabold text-2xl text-gray-600">
            후원아동
          </span>
        </article>
      </Link>
      <Link
        href={baseHref + "?role=sponser"}
        className="w-72 aspect-square bg-white border border-gray-500 rounded-xl p-5 pt-10 pb-2"
      >
        <article className="flex flex-col justify-between gap-y-8">
          <div className="w-44 h-32 m-auto rounded-lg grid place-content-center">
            <MdVolunteerActivism size={80} color="#555555" />
          </div>
          <span className="text-center font-extrabold text-2xl text-gray-600">
            후원자
          </span>
        </article>
      </Link>
    </Page>
  );
}

export default SelectRolePage;
