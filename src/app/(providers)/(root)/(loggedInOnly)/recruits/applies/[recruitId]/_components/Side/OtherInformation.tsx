import { PropsWithChildren } from "react";

interface OtherAppliesProps {
  title: string;
}

function OtherInformation({
  title,
  children,
}: PropsWithChildren<OtherAppliesProps>) {
  return (
    <article>
      <h3 className="font-bold text-center">{title}</h3>
      <ul className="grid grid-cols-1 mt-2 gap-y-2">{children}</ul>
    </article>
  );
}

export default OtherInformation;
