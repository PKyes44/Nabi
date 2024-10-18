import TanstackProvider from "@/app/(providers)/_providers/tanstack-query.provider";
import { PropsWithChildren } from "react";
import AuthProvider from "./_providers/auth.provider";
import ModalProvider from "./_providers/modal.provider";
import ToastProvider from "./_providers/toast.provider";

function ProviderLayout({ children }: PropsWithChildren) {
  return (
    <TanstackProvider>
      <AuthProvider>
        <ToastProvider>
          <ModalProvider>{children}</ModalProvider>
        </ToastProvider>
      </AuthProvider>
    </TanstackProvider>
  );
}

export default ProviderLayout;
