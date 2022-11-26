import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Back, Card, Container, Main, Protected } from "../../Components";
import type { RoleType, StatusType, VerificationType } from "../../types";
import { Statuses } from "../../types";
import { Verifications } from "../../types";
import { Roles } from "../../types";
import { capitalize } from "../../utils/capitalize";
import { omit } from "../../utils/omit";
import { trpc } from "../../utils/trpc";

export const Users: NextPage = () => {
  const { query, replace } = useRouter();
  const { data: users, isLoading } = trpc.user.getUsers.useQuery({
    verification: query.verification as VerificationType,
    role: query.role as RoleType,
    status: query.status as StatusType,
  });
  return (
    <>
      <Head>
        <title>ONE | Users</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Container>
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            <Back /> <span className="text-[#7eb0ff]">Users list</span>
          </h1>
          <div className="flex flex-col gap-2 rounded-lg bg-white/20 p-4 sm:flex-row">
            <Select
              onChange={(e) =>
                replace({
                  query: e.target.value
                    ? { ...query, role: e.target.value }
                    : omit(query, "role"),
                })
              }
            >
              <option value="">All Roles</option>
              {Roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </Select>
            <Select
              onChange={(e) =>
                replace({
                  query: e.target.value
                    ? { ...query, verification: e.target.value }
                    : omit(query, "verification"),
                })
              }
            >
              <option value="">All Verifications</option>
              {Verifications.map((verification) => (
                <option key={verification} value={verification}>
                  {verification}
                </option>
              ))}
            </Select>
            <Select
              onChange={(e) =>
                replace({
                  query: e.target.value
                    ? { ...query, status: e.target.value }
                    : omit(query, "status"),
                })
              }
            >
              <option value="">All Statuses</option>
              {Statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </Select>
          </div>
          {!isLoading && users && (
            <Protected roles={["ADMIN"]}>
              <div className="grid-col-1 grid gap-4">
                {users.map((user) => (
                  <Link key={user.id} href={`/users/${user.id}`}>
                    <Card>
                      <h2 className="text-2xl font-bold">{user.name}</h2>
                      <p>{user.email}</p>
                      <p>
                        {capitalize(user.role)} |{" "}
                        {capitalize(user.verification)} |{" "}
                        {capitalize(user.status)}
                      </p>
                    </Card>
                  </Link>
                ))}
              </div>
            </Protected>
          )}
        </Container>
      </Main>
    </>
  );
};

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (
  props
) => (
  <select
    className="mt-1 mb-2 rounded-lg bg-white/20 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#7eb0ff] focus:ring-opacity-50 disabled:bg-gray-900/20"
    {...props}
  />
);
