import { Button, TextInputField } from "evergreen-ui";
import { type NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import { Base, Card, Protected } from "../../Components";
import { capitalize } from "../../utils/capitalize";
import type { RouterOutputs } from "../../utils/trpc";
import { trpc } from "../../utils/trpc";

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
          <Protected hideIfNotAuthorized>
            {!isLoading && user && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Card key={user.id}>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
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
  user: RouterOutputs["user"]["getUser"];
}> = ({ user }) => {
  const [name, setName] = useState(user.name ?? "");
  const [birthDate, setBirthDate] = useState(
    user?.birthDate ? (user?.birthDate).toISOString().slice(0, 10) : ""
  );
  const [occupation, setOccupation] = useState(user?.occupation ?? "");
  const [location, setLocation] = useState(user?.location ?? "");

  const queryClient = trpc.useContext();
  const { mutateAsync: updateUser, isLoading } =
    trpc.user.updateUser.useMutation({
      onSuccess: () => queryClient.user.getUser.invalidate(),
    });
  return (
    <Card>
      <div className="flex flex-col">
        <TextInputField
          marginBottom={8}
          label="Name"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <TextInputField
          marginBottom={8}
          label="Birth Date"
          type="date"
          value={birthDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setBirthDate(e.target.value)
          }
        />
        <TextInputField
          marginBottom={8}
          label="Occupation"
          value={occupation}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setOccupation(e.target.value)
          }
        />
        <TextInputField
          marginBottom={12}
          label="Location"
          value={location}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLocation(e.target.value)
          }
        />
        <Button
          onClick={async () =>
            await updateUser({
              name,
              birthDate: birthDate ? new Date(birthDate) : undefined,
              occupation,
              location,
            })
          }
          isLoading={isLoading}
        >
          Save
        </Button>
      </div>
    </Card>
  );
};
