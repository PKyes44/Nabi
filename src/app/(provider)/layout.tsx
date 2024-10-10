import TanstackProvider from "@/app/(provider)/_providers/tanstack-query.provider";
import { PropsWithChildren } from "react";
import AuthProvider from "./_providers/auth.provider";

function ProviderLayout({ children }: PropsWithChildren) {
  return (
    <TanstackProvider>
      <AuthProvider>{children}</AuthProvider>
    </TanstackProvider>
  );
}

export default ProviderLayout;
