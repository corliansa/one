import { Button, TextInputField } from "evergreen-ui";
import React, { useState } from "react";
import type { RouterOutputs } from "../../../../utils/trpc";
import { trpc } from "../../../../utils/trpc";
import { SelectField, Checkbox } from "evergreen-ui";
import { ListPPICabang } from "../../../../Components/optionsList/ListPPICabang";

export const UpdateProfileFormFirstLogin: React.FC<{
  user: RouterOutputs["user"]["getUser"];
}> = ({ user }) => {
  const [name, setName] = useState(user.name ?? "");
  const [birthDate, setBirthDate] = useState(
    user?.birthDate ? (user?.birthDate).toISOString().slice(0, 10) : "",
  );
  const [ppicabang, setPpiCabang] = useState(user?.ppicabang ?? "");
  const [occupation, setOccupation] = useState(user?.occupation ?? "");
  const [location, setLocation] = useState(user?.location ?? "");
  const [checkedPrivacy, setCheckedPrivacy] = useState(false);
  const queryClient = trpc.useContext();

  const { mutateAsync: updateUserByIdLogin, isLoading } =
    trpc.user.updateUserByIdLogin.useMutation({
      onSuccess: async () => {
        await queryClient.user.getUserById.invalidate({ id: user.id });
        console.log("user updated");
        window.location.reload();
      },
    });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // check privacy
    if (!checkedPrivacy) {
      alert("Please agree to the terms and conditions.");
      return;
    }

    await updateUserByIdLogin({
      id: user.id,
      name,
      birthDate: birthDate ? new Date(birthDate) : undefined,
      occupation,
      location,
      ppicabang,
    });
  };

  const isProfileUpdated = !user.updated;

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit}>
        <TextInputField
          marginBottom={8}
          label="Name"
          value={name}
          required={isProfileUpdated}
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
        <SelectField
          marginBottom={8}
          label="Occupation"
          value={occupation}
          required={isProfileUpdated}
          description="Select your occupation"
          onChange={(e) => setOccupation(e.target.value)}
        >
          <option value="ausbildung">Ausbildung</option>
          <option value="bachelor">Bachelor</option>
          <option value="master">Master</option>
          <option value="doctor">Doctor</option>
          <option value="professor">Professor</option>
        </SelectField>

        <TextInputField
          marginBottom={12}
          label="Location"
          value={location}
          required={isProfileUpdated}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLocation(e.target.value)
          }
        />
        <SelectField
          marginBottom={8}
          label="PPI Cabang"
          required={isProfileUpdated}
          value={ppicabang}
          description="PPI Cabang terdekat dari lokasi domisili anda di Jerman"
          onChange={(e) => setPpiCabang(e.target.value)}
        >
          {ListPPICabang.map((ppi) => {
            return (
              <option key={ppi.value} value={ppi.value}>
                {ppi.label}
              </option>
            );
          })}
        </SelectField>

        <Checkbox
          label="Dengan ini, anda setuju dengan kebijakan privasi kami."
          checked={checkedPrivacy}
          onChange={(e) => setCheckedPrivacy(e.target.checked)}
        />

        <Button type="submit" isLoading={isLoading} className="mt-10 w-full">
          Save
        </Button>
      </form>
    </div>
  );
};
