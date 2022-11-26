import { type NextPage } from "next";
import Head from "next/head";
import { Back, Card, Container, Main, Protected } from "../../Components";
import { capitalize } from "../../utils/capitalize";
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
      <Main>
        <Container>
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            <Back /> <span className="text-[#7eb0ff]">User detail</span>
          </h1>
          {!isLoading && user && (
            <Protected roles={["ADMIN"]}>
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
            </Protected>
          )}
        </Container>
      </Main>
    </>
  );
};
