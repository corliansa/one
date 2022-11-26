import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Back, Card, Container, Main, Protected } from "../../Components";
import { trpc } from "../../utils/trpc";

export const Users: NextPage = () => {
  const { data: users, isLoading } = trpc.user.getUsers.useQuery();
  return (
    <>
      <Head>
        <title>ONE | Users</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Container>
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            <Back /> <span className="text-[#7eb0ff]">Users list</span>
          </h1>
          {!isLoading && users && (
            <Protected roles={["ADMIN"]}>
              <div className="grid-col-1 grid gap-4">
                {users.map((user) => (
                  <Link key={user.id} href={`/users/${user.id}`}>
                    <Card>
                      <h2 className="text-2xl font-bold">{user.name}</h2>
                      <p>{user.email}</p>
                      <p>{user.role}</p>
                    </Card>
                  </Link>
                ))}
              </div>
            </Protected>
          )}
        </Container>
      </Main>
    </>
  );
};
