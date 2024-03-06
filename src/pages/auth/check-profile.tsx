import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

export const CheckProfile = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  useEffect(() => {
    // Wait until the session is fully loaded
    if (status === "loading") return;
    if (status === "unauthenticated") {
      // Redirect to sign-in if somehow accessed without being authenticated
      signIn("google");
      return;
    }

    if (session?.user?.updated) {
      router.replace("/dashboard");
    } else {
      router.replace("/update");
    }
  }, [session, status, router]);

  return (
    <div className="flex flex-col h-full items-center justify-center">Loading...</div> // Show a loading message or spinner while waiting
  );
};

export default CheckProfile;
