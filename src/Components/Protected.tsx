import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import type { RoleType } from "../types";

export const Protected: React.FC<{
  children: React.ReactNode;
  roles?: RoleType[];
  hideIfNotAuthorized?: boolean;
  redirectTo?: string;
  replacer?: JSX.Element;
}> = (props) => {
  const { data: session, status } = useSession();
  const { replace } = useRouter();

  if (status === "loading") {
    return props?.hideIfNotAuthorized
      ? null
      : props.replacer ?? <>Loading...</>;
  }

  if (status === "unauthenticated") {
    props.redirectTo && replace(props.redirectTo || "/");
    return props?.hideIfNotAuthorized
      ? null
      : props.replacer ?? <>Unauthenticated</>;
  }

  if (!session || !session.user) {
    props.redirectTo && replace(props.redirectTo || "/");
    return props?.hideIfNotAuthorized
      ? null
      : props.replacer ?? <>Unauthorized</>;
  }

  if (props.roles && !props.roles.includes(session.user.role as RoleType)) {
    props.redirectTo && replace(props.redirectTo || "/");
    return props?.hideIfNotAuthorized ? null : props.replacer ?? <>Forbidden</>;
  }

  return <>{props.children}</>;
};
