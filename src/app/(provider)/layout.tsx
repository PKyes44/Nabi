import TanstackProvider from "@/app/(provider)/_providers/tanstack-query.provider";
import { PropsWithChildren } from "react";

function ProvidersLayout({ children }: PropsWithChildren) {
  return <TanstackProvider>{children}</TanstackProvider>;
}

export default ProvidersLayout;
