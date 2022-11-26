import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Container, Main, Protected } from "../../Components";

export const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>ONE</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Container>
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            <span className="text-[#7eb0ff]">ONE</span>
          </h1>

          <AuthShowcase />

          <CardView>
            <Protected hideIfNotAuthorized>
              <Card
                href="/profile"
                title="Profile"
                desc="Edit your profile data"
              />
            </Protected>
            <Protected roles={["ADMIN"]} hideIfNotAuthorized>
              <Card href="/users" title="Users" desc="View all users" />
            </Protected>
          </CardView>
        </Container>
      </Main>
    </>
  );
};

const CardView: React.FC<{ children: React.ReactNode }> = (props) => (
  <div className="grid grid-cols-2 gap-4" {...props} />
);

const Card: React.FC<{ href: string; title: string; desc: string }> = (
  props
) => (
  <Link
    className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/20 p-4 text-white hover:bg-white/30"
    href={props.href}
  >
    <h3 className="text-2xl font-bold">{props.title} →</h3>
    <div className="text-lg">{props.desc}</div>
  </Link>
);

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData ? (
          <span>Logged in as {sessionData.user?.name}</span>
        ) : (
          <span>Welcome to ONE</span>
        )}
      </p>
      <button
        className="rounded-full bg-white/20 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/30"
        onClick={sessionData ? () => signOut() : () => signIn("google")}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
