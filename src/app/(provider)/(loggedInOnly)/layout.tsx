import { useAuthStore } from "@/zustand/auth.store";
import { PropsWithChildren, useEffect } from "react";

function LoggedInOnlyLayout({ children }: PropsWithChildren) {
  useAuthStore((state) => state.isLoggedIn);
  useAuthStore((state) => state.authInitialized);

  useEffect(() => {}, []);

  return children;
}

export default LoggedInOnlyLayout;
