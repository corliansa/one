import type { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import type { RoleType, StatusType, VerificationType } from "../types";
import { Role, Status, Verification } from "@prisma/client";

export const Protected: React.FC<{
  children?:
    | React.ReactNode
    | ((callback: { session: Session }) => React.ReactNode);
  roles?: RoleType[];
  redirectTo?: string;
  replacer?: JSX.Element;
  verification?: VerificationType;
  status?: StatusType;
}> = (props) => {
  const { data: session, status } = useSession();
  const { replace } = useRouter();
if (typeof props.children === "function"){
  const date = new Date()
  date.setFullYear(new Date().getFullYear() + 1)
  const dummyUser = {user:{id:"123", role: Role.ADMIN, status:Status.ACTIVE, verification : Verification.VERIFIED}, expires:date.toISOString()}
  return <>{props.children({session : session || dummyUser}) }</>
}
  
return <>{props.children}</>
  if (status === "loading") {
    return props.replacer ?? null;
  }


  const unauthenticated = () => {
    //props.redirectTo && replace(props.redirectTo || "/");
    return props.replacer ?? null;
  };

  if (status === "unauthenticated") {
    return unauthenticated();
  }

  if (!session || !session.user) {
    return unauthenticated();
  }

  if (props.roles && !props.roles.includes(session.user.role as RoleType)) {
    return unauthenticated();
  }

  if (
    (props.verification && props.verification !== session.user.verification) ||
    (props.status && props.status !== session.user.status)
  ) {
    return unauthenticated();
  }

  return (
    <>
      {props?.children
        ? typeof props.children === "function"
          ? props.children({ session })
          : props.children
        : null}
    </>
  );
};
