import TanstackProvider from "@/providers/TanstackProvider";
import { PropsWithChildren } from "react";

function ProvidersLayout({ children }: PropsWithChildren) {
  return <TanstackProvider>{children}</TanstackProvider>;
}

export default ProvidersLayout;
