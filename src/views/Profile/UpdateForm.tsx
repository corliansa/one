import { Button, CrossIcon, TextInputField } from "evergreen-ui";
import React, { useState, useEffect, Fragment } from "react";
import type { RouterOutputs } from "../../utils/trpc";
import { trpc } from "../../utils/trpc";
import { SelectField, Autocomplete } from "evergreen-ui";
import { ListPPICabang } from "../../Components/optionsList/ListPPICabang";
import { FormError, FormSuccess } from "../../Components/ui";
import { Dialog, Transition } from "@headlessui/react";
import { germanCities, studiengangsListe } from "../../Components/optionsList";

export const UpdateProfileForm: React.FC<{
  user: RouterOutputs["user"]["getUser"];
}> = ({ user }) => {
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
  const [studySpecialization, setStudySpecialization] = useState(
    user.studySpecialization ?? "",
  );

  // error states
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // dialogue to confirm
  const [isOpen, setIsOpen] = useState(false);

  const isProfileUpdated = !user.updated;

  const queryClient = trpc.useUtils();

  const { mutateAsync: updateUser, isLoading } =
    trpc.user.updateUser.useMutation({
      onSuccess: async () => {
        await queryClient.user?.getUser?.invalidate();
        setSuccess("Profile updated successfully!");
        () => setIsOpen(false);
      },
      onError: (error) => {
        setError(error.message);
      },
    });

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

  const handleClick = async () => {
    await updateUser({
      name,
      birthDate: birthDate ? new Date(birthDate) : undefined,
      occupation,
      location,
      ppicabang,
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
      bundesland,
      updatedAt: new Date(),
    });
  };

  return (
    <div className="flex w-full max-w-4xl flex-col">
      <div className="flex w-full flex-col gap-5 md:flex-row">
        <TextInputField
          label="Name"
          value={name}
          marginBottom={8}
          width="100%"
          disabled={isLoading}
          required={isProfileUpdated}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <TextInputField
          label="Birth Date"
          type="date"
          marginBottom={8}
          width="100%"
          disabled={isLoading}
          value={birthDate}
          required={isProfileUpdated}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setBirthDate(e.target.value)
          }
        />
      </div>

      <SelectField
        label="Status Pendidikan Saat Ini"
        description="Jika anda masih dalam proses pendidikan, pilih status pendidikan saat ini."
        value={occupation}
        disabled={isLoading}
        marginBottom={8}
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
              {...getInputProps()}
              label="Bidang Studi"
              description="Bidang Studi dalam bahasa Jerman. Jika tidak ada di daftar bidang studi, silahkan tulis sendiri."
              ref={getRef}
              value={fieldOfStudy}
              marginBottom={8}
              disabled={isLoading}
              required={isProfileUpdated}
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
        marginBottom={8}
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
          marginBottom={8}
          required={
            isProfileUpdated &&
            ["bachelor", "master", "doctor", "ausbildung"].includes(occupation)
          }
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setExpectedGraduation(e.target.value)
          }
        />
      )}

      <div className="flex flex-col gap-5 md:flex-row">
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
                placeholder="Braunschweig, Berlin, München, dll."
                marginBottom={8}
                ref={getRef}
                width="100%"
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
          width="100%"
          label="Negara Bagian"
          marginBottom={8}
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
      </div>

      <SelectField
        label="PPI Cabang"
        required={isProfileUpdated}
        value={ppicabang}
        marginBottom={8}
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
        onClick={() => setIsOpen(true)}
        isLoading={isLoading}
        appearance="primary"
        className="mt-6"
      >
        Save
      </Button>

      {/* Dialogue to confirm */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Updating Profile
                  </Dialog.Title>
                  <div className="py-5">
                    <p className="text-sm text-gray-500">
                      For security reasons, you are only allowed to update your
                      profile once every{" "}
                      <span className="font-bold">7 days</span>.
                    </p>
                    <p className="text-sm text-gray-500">
                      Are you sure you want to update your profile?
                    </p>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <Button
                      onClick={() => setIsOpen(false)}
                      className="bg-gray-300"
                      iconAfter={CrossIcon}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleClick}
                      isLoading={isLoading}
                      className="bg-blue-500"
                      intent="danger"
                      appearance="primary"
                    >
                      Update
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
