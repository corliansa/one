import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { Back, Card, Container, Main, Protected } from "../../Components";
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
              <Form user={user} />
            </Protected>
          )}
        </Container>
      </Main>
    </>
  );
};

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => (
  <input
    className="mt-1 mb-2 w-full rounded-lg bg-white/20 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#7eb0ff] focus:ring-opacity-50 disabled:bg-gray-900/20"
    {...props}
  />
);

export const Form: React.FC<{
  user: RouterOutputs["user"]["getUser"];
}> = ({ user }) => {
  const [name, setName] = useState(user.name ?? "");
  const [birthDate, setBirthDate] = useState(
    (user?.birthDate ?? new Date()).toISOString().slice(0, 10)
  );
  const [occupation, setOccupation] = useState(user?.occupation ?? "");
  const [city, setCity] = useState(user?.city ?? "");

  const { mutateAsync: updateUser, isLoading } =
    trpc.user.updateUser.useMutation();
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
        onClick={() =>
          updateUser({ name, birthDate: new Date(birthDate), occupation, city })
        }
        disabled={isLoading}
      />
    </Card>
  );
};
