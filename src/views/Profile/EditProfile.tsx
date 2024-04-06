import Head from "next/head";
import type { NextPage } from "next";
import { Base, Protected, Card } from "../../Components";
import { UpdateProfileForm } from "./UpdateForm";
import { trpc } from "../../utils/trpc";

export const Edit: NextPage = () => {
  const { data: user, isLoading } = trpc.user.getUser.useQuery();
  return (
    <>
      <Head>
        <title>ONE | Edit Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Base title="Edit Profile">
        <div className="py-4">
          <Protected redirectTo="/">
            {!isLoading && user && (
              <div className="flex w-full">
                <Card className="">
                  <UpdateProfileForm user={user} />
                </Card>
              </div>
            )}
          </Protected>
        </div>
      </Base>
    </>
  );
};
