import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Base, Container, Main, Protected } from "../../Components";

export const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>ONE | Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Base title="Dashboard"></Base>
    </>
  );
};
