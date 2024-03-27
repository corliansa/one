import { Button, TextInputField } from "evergreen-ui";
import React, { useState } from "react";
import type { RouterOutputs } from "../../utils/trpc";
import { trpc } from "../../utils/trpc";
import { SelectField } from "evergreen-ui";
import { ListPPICabang } from "../../Components/optionsList/ListPPICabang";
import { FormError, FormSuccess } from "../../Components/ui";

export const UpdateProfileForm: React.FC<{
  user: RouterOutputs["user"]["getUser"];
  closeOnClick: () => void;
}> = ({ user, closeOnClick }) => {
  const [name, setName] = useState(user.name ?? "");
  const [birthDate, setBirthDate] = useState(
    user?.birthDate ? (user?.birthDate).toISOString().slice(0, 10) : "",
  );
  const [ppicabang, setPpiCabang] = useState(user?.ppicabang ?? "");
  const [occupation, setOccupation] = useState(user?.occupation ?? "");
  const [fieldOfStudy, setFieldOfStudy] = useState(user?.fieldOfStudy ?? "");
  const [location, setLocation] = useState(user?.location ?? "");
  const [expectedGraduation, setExpectedGraduation] = useState(
    user.expectedGraduation
      ? user.expectedGraduation.toISOString().slice(0, 10)
      : "",
  );
  const [bundesland, setBundesland] = useState(user.bundesland ?? "");

  // error states
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const isProfileUpdated = !user.updated;

  const queryClient = trpc.useUtils();
  const { mutateAsync: updateUser, isLoading } =
    trpc.user.updateUser.useMutation({
      onSuccess: async () => {
        await queryClient.user?.getUser?.invalidate();
        setSuccess("Profile updated successfully!");
      },
      onError: (error) => {
        setError(error.message);
      },
    });

  const handleBundesland = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBundesland(e.target.value);
  };

  const handleClick = async () => {
    await updateUser({
      name,
      birthDate: birthDate ? new Date(birthDate) : undefined,
      occupation,
      location,
      ppicabang,
      fieldOfStudy,
      expectedGraduation: expectedGraduation
        ? new Date(expectedGraduation)
        : undefined,
      bundesland,
    });
    closeOnClick();
  };

  return (
    <div className="flex flex-col">
      <TextInputField
        marginBottom={8}
        label="Name"
        value={name}
        disabled={isLoading}
        required={isProfileUpdated}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
      />
      <TextInputField
        marginBottom={8}
        label="Birth Date"
        type="date"
        disabled={isLoading}
        value={birthDate}
        required={isProfileUpdated}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setBirthDate(e.target.value)
        }
      />
      <SelectField
        marginBottom={8}
        label="Occupation"
        value={occupation}
        disabled={isLoading}
        required={isProfileUpdated}
        description="Select your occupation"
        onChange={(e) => setOccupation(e.target.value)}
      >
        <option value="ausbildung">Ausbildung</option>
        <option value="bachelor">Bachelor</option>
        <option value="master">Master</option>
        <option value="doctor">Doctor</option>
        <option value="doctor">Researcher</option>
      </SelectField>

      <TextInputField
        marginBottom={8}
        label="Bidang Studi"
        value={fieldOfStudy}
        disabled={isLoading}
        required={isProfileUpdated}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFieldOfStudy(e.target.value)
        }
      />

      {occupation === "professor" ? null : (
        <TextInputField
          marginBottom={8}
          label="Perkiraan Tanggal Kelulusan"
          type="date"
          disabled={isLoading}
          value={expectedGraduation}
          required={
            isProfileUpdated &&
            ["bachelor", "master", "doctor", "ausbildung"].includes(occupation)
          }
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setExpectedGraduation(e.target.value)
          }
        />
      )}

      <SelectField
        marginBottom={8}
        required={isProfileUpdated}
        disabled={isLoading}
        value={bundesland}
        label="Negara Bagian"
        onChange={handleBundesland}
      >
        <option value="">Pilih Negara Bagian</option>
        <option value="baden-württemberg">Baden-Württemberg</option>
        <option value="bayern">Bayern</option>
        <option value="berlin">Berlin</option>
        <option value="brandenburg">Brandenburg</option>
        <option value="bremen">Bremen</option>
        <option value="hamburg">Hamburg</option>
        <option value="hessen">Hessen</option>
        <option value="mecklenburg-vorpommern">Mecklenburg-Vorpommern</option>
        <option value="niedersachsen">Niedersachsen</option>
        <option value="nordrhein-westfalen">Nordrhein Westfalen</option>
        <option value="rheinland-pfalz">Rheinland-Pfalz</option>
        <option value="saarland">Saarland</option>
        <option value="sachsen">Sachsen</option>
        <option value="sachsen-anhalt">Sachsen-Anhalt</option>
        <option value="schleswig-holstein">Schleswig-Holstein</option>
        <option value="thüringen">Thüringen</option>
      </SelectField>

      <TextInputField
        marginBottom={12}
        label="Domisili"
        description="Lokasi domisili anda di Jerman"
        value={location}
        disabled={isLoading}
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
        disabled={isLoading}
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

      <FormError message={error} />
      <FormSuccess message={success} />

      <Button
        onClick={handleClick}
        isLoading={isLoading}
        className="focus:shadow-outline mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
      >
        Save
      </Button>
    </div>
  );
};
