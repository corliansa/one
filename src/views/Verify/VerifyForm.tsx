import { useState } from "react";
import { Button, TextInputField, Combobox, Checkbox } from "evergreen-ui";
import { University } from "../../types";
import { Universities } from "../../Components/optionsList/de-university-list";
import { trpc } from "../../utils/trpc";
import { FormError } from "../../Components/ui/FormError";
import { FormSuccess } from "../../Components/ui/FormSuccess";

const universityList: University[] = Universities as University[];

export const VerifyForm: React.FC = () => {
  const [universityEmail, setUniversityEmail] = useState("");
  const [university, setUniversity] = useState<University | null>(null);
  const [checkedPrivacy, setCheckedPrivacy] = useState(false);
  const queryClient = trpc.useContext();

  const { mutateAsync: updateUserUniEmail, isLoading } =
    trpc.user.updateUserUniEmail.useMutation({
      onSuccess: () => queryClient.user?.getUser?.invalidate(),
    });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!university) {
      alert("Please select a university.");
      return;
    }

    if (
      universityEmail &&
      university &&
      !university.domains.some((domain) => universityEmail.endsWith(domain))
    ) {
      alert("University email must match the selected university domain.");
      return;
    }

    if (!checkedPrivacy) {
      alert("Please agree to the terms and conditions.");
      return;
    }

    await updateUserUniEmail({
      universityEmail,
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">
          Pilih universitas anda saat ini
        </label>
        <Combobox
          placeholder="Universitas"
          items={universityList}
          itemToString={(universityList) =>
            universityList ? universityList.name : ""
          }
          width="100%"
          onChange={(selected: University) => {
            setUniversity(selected);
            console.log(selected);
          }}
        />
        <TextInputField
          marginTop={8}
          marginBottom={24}
          label="University Email"
          type="email"
          placeholder="nicole@tu-jerman.de"
          value={universityEmail}
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUniversityEmail(e.target.value)
          }
        />

        <Checkbox
          label="Dengan ini, anda setuju dengan kebijakan privasi kami."
          checked={checkedPrivacy}
          onChange={(e) => setCheckedPrivacy(e.target.checked)}
        />

        <FormError message="" />
        <FormSuccess message="" />
        <Button isLoading={isLoading} appearance="primary">
          Verifikasi Email Universitas
        </Button>
      </div>
    </form>
  );
};
