import { type NextPage } from "next";
import Head from "next/head";
import { Container, Main, Protected } from "../../Components";

export const Profile: NextPage = () => {
  return (
    <>
      <Head>
        <title>One | Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Container>
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            <span className="text-[#7eb0ff]">Profile</span>
          </h1>
          <Protected>
            <h2 className="text-2xl font-bold text-white">Protected Page</h2>
          </Protected>
        </Container>
      </Main>
    </>
  );
};
