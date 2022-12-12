import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { Base, Card, Input, Protected, Select } from "../../Components";
import type { RoleType, StatusType, VerificationType } from "../../types";
import { Roles, Statuses, Verifications } from "../../types";
import { capitalize } from "../../utils/capitalize";
import type { RouterOutputs } from "../../utils/trpc";
import { trpc } from "../../utils/trpc";

export const User: NextPage<{ userId: string }> = ({ userId }) => {
  const { data: user, isLoading } = trpc.user.getUserById.useQuery({
    id: userId,
  });
  return (
    <>
      <Head>
        <title>ONE | User Detail</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Base title={user?.name ?? " "}>
        <div className="py-4">
          <Protected
            roles={["ADMIN"]}
            hideIfNotAuthorized
            redirectTo="/dashboard"
          >
            {!isLoading && user && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Card>
                  {[
                    { label: "Email", value: user.email },
                    { label: "Role", value: capitalize(user.role) },
                    { label: "Status", value: capitalize(user.status) },
                    {
                      label: "Verified",
                      value: user.verification === "VERIFIED" ? "Yes" : "No",
                    },
                    {
                      label: "Birth date",
                      value: user.birthDate?.toLocaleDateString() ?? "N/A",
                    },
                    { label: "Occupation", value: user.occupation ?? "N/A" },
                    {
                      label: "Affiliation",
                      value:
                        user.affiliation.length > 0
                          ? user.affiliation.join(" ,")
                          : "N/A",
                    },
                    { label: "City", value: user.city ?? "N/A" },
                  ].map(({ label, value }) => (
                    <p key={label}>
                      <>
                        <span className="font-bold">{label}: </span>
                        {value}
                      </>
                    </p>
                  ))}
                </Card>
                <Form user={user} />
              </div>
            )}
          </Protected>
        </div>
      </Base>
    </>
  );
};

export const Form: React.FC<{
  user: RouterOutputs["user"]["getUserById"];
}> = ({ user }) => {
  const [role, setRole] = useState(user.role ?? "USER");
  const [verification, setVerification] = useState(
    user.verification ?? "UNVERIFIED"
  );
  const [status, setStatus] = useState(user.status ?? "ACTIVE");

  const queryClient = trpc.useContext();
  const { mutateAsync: updateUserById, isLoading } =
    trpc.user.updateUserById.useMutation({
      onSuccess: () => queryClient.user.getUserById.invalidate({ id: user.id }),
    });
  return (
    <Card>
      <div className="flex flex-col">
        Role
        <Select
          value={role}
          onChange={(e) => setRole(e.target.value as RoleType)}
        >
          {Roles.map((role) => (
            <option key={role} value={role}>
              {capitalize(role)}
            </option>
          ))}
        </Select>
        Verification
        <Select
          value={verification}
          onChange={(e) => setVerification(e.target.value as VerificationType)}
        >
          {Verifications.map((verification) => (
            <option key={verification} value={verification}>
              {capitalize(verification)}
            </option>
          ))}
        </Select>
        Status
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value as StatusType)}
        >
          {Statuses.map((status) => (
            <option key={status} value={status}>
              {capitalize(status)}
            </option>
          ))}
        </Select>
        <Input
          type="submit"
          value="Submit"
          onClick={async () =>
            await updateUserById({ id: user.id, role, verification, status })
          }
          disabled={isLoading}
        />
      </div>
    </Card>
  );
};
