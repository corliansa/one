import React from "react";
import { UpdateProfileFormFirst } from "../../../../Components/UpdateFormFirst";
import { Protected } from "../../../../Components";
import { trpc } from "../../../../utils/trpc";
import { Card } from "../../../../Components/Card";
const UpdateProfilePage = () => {
  const { data: user, isLoading } = trpc.user.getUser.useQuery();
  return (
    <Protected redirectTo="/">
      {!isLoading && user && (
        <div className="flex h-full flex-col items-center justify-center">
          <Card className="p-10">
            <h1 className="p-10 text-3xl">Update info sensus</h1>
            <UpdateProfileFormFirst user={user} />
          </Card>
        </div>
      )}
    </Protected>
  );
};

export default UpdateProfilePage;
