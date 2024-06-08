import { type NextPage } from "next";
import Head from "next/head";
import { Base, Card, Protected } from "../../Components";
import { trpc } from "../../utils/trpc";

export const Admins: NextPage = () => {
  const { data: admins, isLoading } = trpc.internal.getAdmins.useQuery();

  return (
    <>
      <Head>
        <title>ONE | Admins</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Base title="Admins list">
        <div className="py-4">
          <Protected redirectTo="/">
            {!isLoading && admins && (
              <div className="grid gap-2 py-4 lg:grid-cols-2">
                {admins.length === 0 ? (
                  <Card>
                    <p>No admins found</p>
                  </Card>
                ) : (
                  <>
                    {admins.map((user) => (
                      <Card key={user.email}>
                        <div className="flex h-16 flex-col justify-center">
                          <h2 className="text-xl font-semibold">{user.name}</h2>
                          <p>{user.email}</p>
                        </div>
                      </Card>
                    ))}
                  </>
                )}
              </div>
            )}
          </Protected>
        </div>
      </Base>
    </>
  );
};
