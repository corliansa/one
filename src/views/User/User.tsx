import { type NextPage } from "next";
import Head from "next/head";
import { Base, Protected } from "../../Components";
import { trpc } from "../../utils/trpc";
import { UserForm } from "./UserForm";
import { FormError } from "../../Components/ui";
import { UserInfo } from "../../Components/UserInfo";

export const User: NextPage<{ userId: string }> = ({ userId }) => {
  const { data: user, isLoading } = trpc.user.getUserById.useQuery({
    id: userId,
  });
  // TODO: Query users based on their role.
  // Superadmins are able to query on all users, while PPI Cabang admins can only query on users that are affiliated with their PPI Cabang. Maybe add a filter for this based on the user.role and user.ppicabang.
  return (
    <>
      <Head>
        <title>ONE | User Detail</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Base title={user?.name ?? " "}>
        <Protected
          roles={["ADMIN"]}
          replacer={
            <FormError message="Unauthorized access to user data! Please contact admin for access." />
          }
        >
          <h1>Admin View, editing user...</h1>
          <div className="py-4">
            {!isLoading && user && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <UserInfo user={user} />
                <UserForm user={user} />
              </div>
            )}
          </div>
        </Protected>
      </Base>
    </>
  );
};
