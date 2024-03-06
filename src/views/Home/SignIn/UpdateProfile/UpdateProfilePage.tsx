import React from "react";
import { UpdateProfileFormFirstLogin } from "../../../../Components/UpdateFormFirstLogin";
import { ProtectedUpdate } from "./ProtectedUpdate";
import { trpc } from "../../../../utils/trpc";
import { Card } from "../../../../Components/Card";
import type { NextPage } from "next";

const UpdateProfilePage: NextPage = () => {
  const { data: user, isLoading } = trpc.user.getUser.useQuery();
  return (
    <ProtectedUpdate redirectTo="/">
      {!isLoading && user && (
        <div className="flex h-full flex-col items-center justify-center">
          <Card className="p-10">
            <h1 className="p-10 text-3xl">Update info sensus</h1>
            <UpdateProfileFormFirstLogin user={user} />
          </Card>
        </div>
      )}
    </ProtectedUpdate>
  );
};

export default UpdateProfilePage;
