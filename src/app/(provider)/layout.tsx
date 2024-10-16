import TanstackProvider from "@/app/(provider)/_providers/tanstack-query.provider";
import { PropsWithChildren } from "react";
import AuthProvider from "./_providers/auth.provider";
import ModalProvider from "./_providers/modal.provider";

function ProviderLayout({ children }: PropsWithChildren) {
  return (
    <TanstackProvider>
      <AuthProvider>
        <ModalProvider>{children}</ModalProvider>
      </AuthProvider>
    </TanstackProvider>
  );
}

export default ProviderLayout;
