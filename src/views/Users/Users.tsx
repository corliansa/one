import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Base, Card, Protected, Select } from "../../Components";
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
      <Base title="Users list">
        <div className="py-4">
          <div className="flex flex-col gap-0 rounded-lg bg-white/20 sm:flex-row sm:gap-2">
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
          <Protected
            roles={["ADMIN"]}
            hideIfNotAuthorized
            redirectTo="/dashboard"
          >
            {!isLoading && users && (
              <div className="grid gap-2 py-4">
                {users.length === 0 ? (
                  <Card>
                    <p>No users found</p>
                  </Card>
                ) : (
                  <>
                    {users.map((user) => (
                      <Link key={user.id} href={`/users/${user.id}`}>
                        <Card>
                          <div className="flex h-20 flex-col justify-center">
                            <h2 className="text-xl font-semibold">
                              {user.name}
                            </h2>
                            <p>{user.email}</p>
                            <p>
                              {capitalize(user.role)} |{" "}
                              {capitalize(user.verification)} |{" "}
                              {capitalize(user.status)}
                            </p>
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </>
                )}
              </div>
            )}
          </Protected>
        </div>
      </Base>
    </>
  );
};
