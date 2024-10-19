import TanstackProvider from "@/app/(providers)/_providers/tanstack-query.provider";
import { PropsWithChildren } from "react";
import AuthProvider from "./_providers/auth.provider";
import ModalProvider from "./_providers/modal.provider";
import NotificationProvider from "./_providers/notify.provider";
import ToastProvider from "./_providers/toast.provider";

function ProviderLayout({ children }: PropsWithChildren) {
  return (
    <TanstackProvider>
      <AuthProvider>
        <ToastProvider>
          <ModalProvider>
            <NotificationProvider>{children}</NotificationProvider>
          </ModalProvider>
        </ToastProvider>
      </AuthProvider>
    </TanstackProvider>
  );
}

export default ProviderLayout;
