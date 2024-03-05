import { Button, FormField, SelectField, TagInput } from "evergreen-ui";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { Base, Card, Protected } from "../../Components";
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
        <h1>Admin View, editing user...</h1>
        <div className="py-4">
          <Protected roles={["ADMIN"]} redirectTo="/dashboard">
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
                        user.affiliation.length > 0 ? (
                          <ul className="list-disc pl-4">
                            {user.affiliation
                              .sort((a, b) => b.length - a.length)
                              .map((affiliation) => (
                                <li key={affiliation}>
                                  {affiliation.replace("_", " ")}
                                </li>
                              ))}
                          </ul>
                        ) : (
                          "N/A"
                        ),
                    },
                    { label: "Location", value: user.location ?? "N/A" },
                    {
                      label: "PPI Cabang",
                      value: user.ppicabang ?? "N/A",
                    },
                    {
                      label: "Updated Info",
                      value: user.updated ? "Yes" : "No",
                    },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <span className="font-bold">{label}: </span>
                      {value}
                    </div>
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
    user.verification ?? "UNVERIFIED",
  );
  const [status, setStatus] = useState(user.status ?? "ACTIVE");
  const [affiliation, setAffiliation] = useState<string[]>(
    user.affiliation ?? [],
  );

  const queryClient = trpc.useContext();
  const { mutateAsync: updateUserById, isLoading } =
    trpc.user.updateUserById.useMutation({
      onSuccess: () => queryClient.user.getUserById.invalidate({ id: user.id }),
    });
  return (
    <>
      <Card>
        <div className="flex flex-col">
          <SelectField
            marginBottom={8}
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value as RoleType)}
          >
            {Roles.map((role) => (
              <option key={role} value={role}>
                {capitalize(role)}
              </option>
            ))}
          </SelectField>
          <SelectField
            marginBottom={8}
            label="Verification"
            value={verification}
            onChange={(e) =>
              setVerification(e.target.value as VerificationType)
            }
          >
            {Verifications.map((verification) => (
              <option key={verification} value={verification}>
                {capitalize(verification)}
              </option>
            ))}
          </SelectField>
          <SelectField
            marginBottom={8}
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value as StatusType)}
          >
            {Statuses.map((status) => (
              <option key={status} value={status}>
                {capitalize(status)}
              </option>
            ))}
          </SelectField>
          <FormField marginBottom={12} width="100%" label="Affiliation">
            <TagInput
              width="100%"
              id="affiliation"
              values={affiliation}
              onChange={(values: string[]) => {
                setAffiliation(values);
              }}
            />
          </FormField>

          <Button
            onClick={async () =>
              await updateUserById({
                id: user.id,
                role,
                verification,
                status,
                affiliation,
              })
            }
            isLoading={isLoading}
          >
            Save
          </Button>
        </div>
      </Card>
    </>
  );
};
