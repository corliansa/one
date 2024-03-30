import { type NextPage } from "next";
import Head from "next/head";
import { Base, Protected, Card } from "../../Components";
import { trpc } from "../../utils/trpc";
import { UserInfo } from "../../Components/UserInfo";
import { Button, EditIcon } from "evergreen-ui";

export const Profile: NextPage = () => {
  const { data: user, isLoading } = trpc.user.getUser.useQuery();

  return (
    <>
      <Head>
        <title>ONE | Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Base title="Profile">
        <div className="py-4">
          <Protected redirectTo="/">
            {!isLoading && user && (
              <div className="flex w-full flex-col gap-3 md:flex-row">
                <Card>
                  <UserInfo user={user} />
                  <div className="pt-10">
                    <Button
                      appearance="primary"
                      onClick={() => {
                        window.location.href = "/profile/edit";
                      }}
                      iconAfter={EditIcon}
                      className="w-full p-4"
                    >
                      Edit Profile
                    </Button>
                  </div>
                </Card>
              </div>
            )}
          </Protected>
        </div>
      </Base>
    </>
  );
};
