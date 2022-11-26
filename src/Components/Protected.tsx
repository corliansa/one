import { useSession } from "next-auth/react";

export const Protected: React.FC<{
  children: React.ReactNode;
  role?: "ADMIN" | "USER";
}> = (props) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Unauthenticated</p>;
  }

  if (!session) {
    return <p>Unauthorized</p>;
  }

  if (props.role && !session.user?.role.includes(props.role)) {
    return <p>Forbidden</p>;
  }

  return <>{props.children}</>;
};
