import TanstackProvider from "@/app/(provider)/_providers/tanstack-query.provider";
import { PropsWithChildren } from "react";

function ProviderLayout({ children }: PropsWithChildren) {
  return <TanstackProvider>{children}</TanstackProvider>;
}

export default ProviderLayout;
