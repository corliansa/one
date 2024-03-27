import { type NextPage } from "next";
import Head from "next/head";
import { Base, Protected } from "../../Components";
import { trpc } from "../../utils/trpc";
import { UpdateProfileForm } from "./UpdateForm";
import { UserInfo } from "../../Components/UserInfo";
import { useState } from "react";
import { Button, EditIcon } from "evergreen-ui";

export const Profile: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);
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
              <div className="flex flex-row gap-3">
                <UserInfo user={user} />
                <UpdateProfileForm
                  user={user}
                  closeOnClick={() => setIsOpen(false)}
                />
              </div>
            )}
          </Protected>
        </div>
      </Base>
    </>
  );
};
