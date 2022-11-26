import { useSession } from "next-auth/react";
import type { RoleType } from "../types";

export const Protected: React.FC<{
  children: React.ReactNode;
  roles?: RoleType[];
  hideIfNotAuthorized?: boolean;
}> = (props) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return props?.hideIfNotAuthorized ? null : <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return props?.hideIfNotAuthorized ? null : <p>Unauthenticated</p>;
  }

  if (!session || !session.user) {
    return props?.hideIfNotAuthorized ? null : <p>Unauthorized</p>;
  }

  if (props.roles && !props.roles.includes(session.user.role as RoleType)) {
    return props?.hideIfNotAuthorized ? null : <p>Forbidden</p>;
  }

  return <>{props.children}</>;
};
