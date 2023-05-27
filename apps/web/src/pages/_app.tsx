import "../styles/globals.css";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import { SWRConfig } from "swr";
import { UserProvider } from "@auth0/nextjs-auth0/client";

type NextPageWithLayout = NextPage & {
  GetLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function BlindDate({
  Component,
  pageProps: { user, ...pageProps },
}: AppPropsWithLayout) {
  const GetLayout = Component.GetLayout ?? ((page: any) => page);
  return (
    <UserProvider user={user}>
      <SWRConfig>{GetLayout(<Component {...pageProps} />)}</SWRConfig>
    </UserProvider>
  );
}

export default BlindDate;
