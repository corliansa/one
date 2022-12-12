import { type NextPage } from "next";
import Head from "next/head";
import { Base } from "../../Components";

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
