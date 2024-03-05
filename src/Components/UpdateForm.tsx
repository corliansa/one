import { Button, TextInputField } from "evergreen-ui";
import React, { useState } from "react";
import type { RouterOutputs } from "../utils/trpc";
import { trpc } from "../utils/trpc";

export const UpdateProfileForm: React.FC<{
  user: RouterOutputs["user"]["getUser"];
}> = ({ user }) => {
  const [name, setName] = useState(user.name ?? "");
  const [birthDate, setBirthDate] = useState(
    user?.birthDate ? (user?.birthDate).toISOString().slice(0, 10) : "",
  );
  const [occupation, setOccupation] = useState(user?.occupation ?? "");
  const [location, setLocation] = useState(user?.location ?? "");

  const queryClient = trpc.useContext();
  const { mutateAsync: updateUser, isLoading } =
    trpc.user.updateUser.useMutation({
      onSuccess: () => queryClient.user.getUser.invalidate(),
    });
  return (
    <div className="flex flex-col">
      <TextInputField
        marginBottom={8}
        label="Name"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
      />
      <TextInputField
        marginBottom={8}
        label="Birth Date"
        type="date"
        value={birthDate}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setBirthDate(e.target.value)
        }
      />
      <TextInputField
        marginBottom={8}
        label="Occupation"
        value={occupation}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setOccupation(e.target.value)
        }
      />
      <TextInputField
        marginBottom={12}
        label="Location"
        value={location}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setLocation(e.target.value)
        }
      />
      <Button
        onClick={async () =>
          await updateUser({
            name,
            birthDate: birthDate ? new Date(birthDate) : undefined,
            occupation,
            location,
          })
        }
        isLoading={isLoading}
      >
        Save
      </Button>
    </div>
  );
};
