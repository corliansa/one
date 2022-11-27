import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import {
  Back,
  Card,
  Container,
  Input,
  Main,
  Protected,
} from "../../Components";
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
      <Main>
        <Container>
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            <Back /> <span className="text-[#7eb0ff]">Profile</span>
          </h1>
          {!isLoading && user && (
            <Protected>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Card key={user.id}>
                  <h2 className="text-2xl font-bold">{user.name}</h2>
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
            </Protected>
          )}
        </Container>
      </Main>
    </>
  );
};

export const Form: React.FC<{
  user: RouterOutputs["user"]["getUser"];
}> = ({ user }) => {
  const [name, setName] = useState(user.name ?? "");
  const [birthDate, setBirthDate] = useState(
    (user?.birthDate ?? new Date()).toISOString().slice(0, 10)
  );
  const [occupation, setOccupation] = useState(user?.occupation ?? "");
  const [city, setCity] = useState(user?.city ?? "");

  const queryClient = trpc.useContext();
  const { mutateAsync: updateUser, isLoading } =
    trpc.user.updateUser.useMutation({
      onSuccess: () => queryClient.user.getUser.invalidate(),
    });
  return (
    <Card>
      Name
      <Input
        defaultValue={user?.name || ""}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      Birth Date
      <Input
        type="date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
      />
      Occupation
      <Input
        defaultValue={user?.occupation || ""}
        value={occupation}
        onChange={(e) => setOccupation(e.target.value)}
      />
      City
      <Input
        defaultValue={user?.city || ""}
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <Input
        type="submit"
        value="Submit"
        onClick={async () =>
          await updateUser({
            name,
            birthDate: new Date(birthDate),
            occupation,
            city,
          })
        }
        disabled={isLoading}
      />
    </Card>
  );
};
