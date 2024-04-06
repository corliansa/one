import React from "react";
import { UpdateProfileFormFirstLogin } from "./UpdateFormFirstLogin";
import { ProtectedUpdate } from "./ProtectedUpdate";
import { trpc } from "../../../../utils/trpc";
import { Card } from "../../../../Components/Card";
import type { NextPage } from "next";
import { Logo } from "../../../../Components";
import Link from "next/link";

export const UpdateProfilePage: NextPage = () => {
  const { data: user, isLoading } = trpc.user.getUser.useQuery();
  return (
    <ProtectedUpdate redirectTo="/">
      {!isLoading && user && (
        <div className="isolate bg-slate-100">
          <div className="flex min-h-screen flex-col items-center justify-center gap-y-10 p-5">
            <Card className="w-full border-none bg-white shadow-xl md:w-1/2">
              <Link href="/">
                <Logo />
              </Link>
              <h1 className="p-5 text-center text-4xl font-bold">
                Data Diri Sensus
              </h1>

              <UpdateProfileFormFirstLogin user={user} />
            </Card>
          </div>
        </div>
      )}
    </ProtectedUpdate>
  );
};
