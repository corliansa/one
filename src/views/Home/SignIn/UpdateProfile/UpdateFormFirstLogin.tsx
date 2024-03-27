import { Button, Checkbox, SelectField, TextInputField } from "evergreen-ui";
import React, { useState, useEffect } from "react";
import { ListPPICabang } from "../../../../Components/optionsList/ListPPICabang";
import type { RouterOutputs } from "../../../../utils/trpc";
import { trpc } from "../../../../utils/trpc";
import {
  germanCities,
  studiengangsListe,
} from "../../../../Components/optionsList";
import { Autocomplete } from "evergreen-ui";
import { FormError } from "../../../../Components/ui";

type UpdateProfileFormFirstLoginProps = {
  user: RouterOutputs["user"]["getUser"];
};

export const UpdateProfileFormFirstLogin: React.FC<
  UpdateProfileFormFirstLoginProps
> = ({ user }) => {
  const [name, setName] = useState(user?.name ?? "");
  const [birthDate, setBirthDate] = useState<string | undefined>(
    user.birthDate?.toISOString().slice(0, 10) ?? "",
  );
  const [expectedGraduation, setExpectedGraduation] = useState("");
  const [ppicabang, setPpiCabang] = useState("");
  const [occupation, setOccupation] = useState("");
  const [location, setLocation] = useState("");
  const [bundesland, setBundesland] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [checkedPrivacy, setCheckedPrivacy] = useState(false);
  const [formError, setFormError] = useState("");
  const [studySpecialization, setStudySpecialization] = useState("");

  // useContext is deprecated, use useUtils instead
  const queryClient = trpc.useUtils();

  const { mutateAsync: updateUserLogin, isLoading } =
    trpc.user.updateUserLogin.useMutation({
      onSuccess: async () => {
        await queryClient.user.getUser.invalidate();
        console.log("user first registered successfully!");
        window.location.reload();
      },
    });

  // handle fieldOfStudy

  type Studiengang = {
    name: string;
  };

  const handleFieldOfStudy = (selectedFieldOfStudy: Studiengang) => {
    if (selectedFieldOfStudy) {
      setFieldOfStudy(selectedFieldOfStudy.name);
      console.log(selectedFieldOfStudy);
    }
  };

  // handle cities
  type City = {
    name: string;
    bundesland: string;
  };
  const handleCity = (selectedCity: City) => {
    if (selectedCity) {
      setLocation(selectedCity.name);
      console.log(selectedCity);
    }
  };

  // Corrected to trigger handleBundesland automatically when city changes
  useEffect(() => {
    const selectedCity = germanCities.find((city) => city.name === location);
    if (selectedCity) {
      setBundesland(selectedCity.bundesland);
    } else {
      console.log("City not found");
    }
  }, [location]); // Depend on location and germanCities to re-run

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // check privacy
    if (!checkedPrivacy) {
      setFormError("Please agree to the terms and conditions.");
      return;
    }

    setFormError("");

    await updateUserLogin({
      id: user!.id,
      name,
      birthDate: birthDate ? new Date(birthDate) : undefined,
      occupation,
      location,
      ppicabang,
      bundesland,
      fieldOfStudy,
      studySpecialization,
      expectedGraduation: [
        "bachelor",
        "master",
        "doctor",
        "ausbildung",
      ].includes(occupation)
        ? new Date(expectedGraduation)
        : undefined,
    });
  };

  const isProfileUpdated = !user!.updated;

  // TODO: Make component reusable

  return (
    <div className="flex w-full flex-col flex-wrap">
      <form onSubmit={handleSubmit}>
        <TextInputField
          label="Nama"
          value={name}
          disabled={isLoading}
          required={isProfileUpdated}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <TextInputField
          label="Tanggal Lahir"
          description="(opsional)"
          type="date"
          disabled={isLoading}
          value={birthDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setBirthDate(e.target.value)
          }
        />

        <SelectField
          label="Status Pendidikan Saat Ini"
          description="Jika anda masih dalam proses pendidikan, pilih status pendidikan saat ini."
          value={occupation}
          disabled={isLoading}
          required={isProfileUpdated}
          onChange={(e) => setOccupation(e.target.value)}
        >
          <option value="ausbildung">Ausbildung</option>
          <option value="bachelor">Bachelor</option>
          <option value="master">Master</option>
          <option value="doctor">Doctor</option>
          <option value="professor">Professor</option>
        </SelectField>

        <Autocomplete
          items={studiengangsListe}
          itemToString={(studiengangsListe) =>
            studiengangsListe ? studiengangsListe.name : ""
          }
          onChange={handleFieldOfStudy}
          onInputValueChange={(inputValue) => {
            setFieldOfStudy(inputValue);
          }}
        >
          {(props) => {
            const { getInputProps, getRef } = props;
            return (
              <TextInputField
                label="Bidang Studi"
                description="Bidang Studi dalam bahasa Jerman. Jika tidak ada di daftar bidang studi, silahkan tulis sendiri."
                ref={getRef}
                disabled={isLoading}
                required={isProfileUpdated}
                {...getInputProps()}
              />
            );
          }}
        </Autocomplete>

        <TextInputField
          label="Spesialisasi dalam Bidang Studi"
          description="Contoh: AI and Machine Learning (Informatik), Denkmalpflege (Architektur), Neurologie (Medizin), dan lainnya."
          hint="Maksimum 50 karakter."
          isInvalid={studySpecialization.length > 50}
          disabled={isLoading}
          value={studySpecialization}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setStudySpecialization(e.target.value)
          }
        />

        {occupation === "professor" ? null : (
          <TextInputField
            label="Perkiraan Tanggal Kelulusan"
            type="date"
            disabled={isLoading}
            value={expectedGraduation}
            required={
              isProfileUpdated &&
              ["bachelor", "master", "doctor", "ausbildung"].includes(
                occupation,
              )
            }
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setExpectedGraduation(e.target.value)
            }
          />
        )}

        <Autocomplete
          items={germanCities}
          itemToString={(germanCities) =>
            germanCities ? germanCities.name : ""
          }
          onChange={handleCity}
        >
          {(props) => {
            const { getInputProps, getRef } = props;
            return (
              <TextInputField
                label="Kota"
                required={isProfileUpdated}
                placeholder="Domisili"
                ref={getRef}
                disabled={isLoading}
                description="Lokasi domisili anda di Jerman"
                {...getInputProps()}
              />
            );
          }}
        </Autocomplete>

        <SelectField
          required={isProfileUpdated}
          disabled={true}
          value={bundesland}
          label="Negara Bagian"
          description="Negara bagian menyesuaikan kota/domisili anda."
        >
          <option value="">Negara Bagian</option>
          <option value="Baden-Württemberg">Baden-Württemberg</option>
          <option value="Bayern">Bayern</option>
          <option value="Berlin">Berlin</option>
          <option value="Brandenburg">Brandenburg</option>
          <option value="Bremen">Bremen</option>
          <option value="Hamburg">Hamburg</option>
          <option value="Hessen">Hessen</option>
          <option value="Mecklenburg-Vorpommern">Mecklenburg-Vorpommern</option>
          <option value="Niedersachsen">Niedersachsen</option>
          <option value="Nordrhein-Westfalen">Nordrhein-Westfalen</option>
          <option value="Rheinland-Pfalz">Rheinland-Pfalz</option>
          <option value="Saarland">Saarland</option>
          <option value="Sachsen">Sachsen</option>
          <option value="Sachsen-Anhalt">Sachsen-Anhalt</option>
          <option value="Schleswig-Holstein">Schleswig-Holstein</option>
          <option value="Thüringen">Thüringen</option>
        </SelectField>

        <SelectField
          label="PPI Cabang"
          required={isProfileUpdated}
          value={ppicabang}
          disabled={isLoading}
          description="PPI Cabang terdekat dari domisili anda di Jerman"
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
          disabled={isLoading}
          onChange={(e) => setCheckedPrivacy(e.target.checked)}
        />

        <FormError message={formError} />

        <Button
          type="submit"
          appearance="primary"
          isLoading={isLoading}
          className="mt-10 w-full"
        >
          Save
        </Button>
      </form>
    </div>
  );
};
