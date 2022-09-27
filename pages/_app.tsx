import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Fragment } from "react";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import { UserProvider } from "@auth0/nextjs-auth0";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <div className="transition-colors duration-500">
        <ThemeProvider attribute="class">
          <Component {...pageProps} />
          <Head>
            <title>TechComm</title>
            <link rel="icon" href="/TechComm.png" />
          </Head>
        </ThemeProvider>
      </div>
    </UserProvider>
  );
}

export default MyApp;
