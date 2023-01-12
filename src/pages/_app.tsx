import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { trpc } from "../utils/trpc";
import Script from "next/script";

import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Script
        defer
        data-domain="ppi.one"
        src="https://plausible.dlx.pw/js/plausible.js"
      />
      <ReactQueryDevtools initialIsOpen={false} />
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
