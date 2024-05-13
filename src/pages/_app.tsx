import type { AppProps } from "next/app";
// import PrivateRoute from '@/lib/private-route';
import { NextPageWithLayout } from "@/types";
import "@/assets/styles/globals.css";
import { ModalProvider } from "@/components/ui/modal/modal.context";
import ManagedModal from "@/components/ui/modal/managed-modal";
import { AuthProvider } from "@/context/auth.context";
import PrivateRoute from "@/components/layouts/private-route";
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function CustomApp({
  Component,
  pageProps: {
    //@ts-ignore
    session,
    ...pageProps
  },
}: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  const authenticationRequired = Component.authenticationRequired ?? false;

  return (
    <>
      <div>
        <ModalProvider>
          <AuthProvider>
            {authenticationRequired ? (
              <PrivateRoute>
                {getLayout(<Component {...pageProps} />)}
              </PrivateRoute>
            ) : (
              getLayout(<Component {...pageProps} />)
            )}
            <ManagedModal />
          </AuthProvider>
        </ModalProvider>
      </div>
    </>
  );
}

export default CustomApp;
