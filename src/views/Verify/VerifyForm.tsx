import { useState } from "react";
import { Button, TextInputField } from "evergreen-ui";
import { trpc } from "../../utils/trpc";
import { FormError } from "../../Components/ui/FormError";
import { FormSuccess } from "../../Components/ui/FormSuccess";

export const VerifyForm: React.FC = () => {
  const [universityEmail, setUniversityEmail] = useState("");
  const queryClient = trpc.useContext();

  const { mutateAsync: updateUserUniEmail, isLoading } =
    trpc.user.updateUserUniEmail.useMutation({
      onSuccess: () => queryClient.user?.getUser?.invalidate(),
    });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await updateUserUniEmail({
      universityEmail,
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <p className="">
          Masukkan email universitas anda untuk memverifikasi status student
          anda.
        </p>

        <TextInputField
          marginBottom={8}
          label="University Email"
          type="email"
          value={universityEmail}
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUniversityEmail(e.target.value)
          }
        />
        <FormError message="" />
        <FormSuccess message="" />
        <Button isLoading={isLoading} appearance="default" intent="success">
          Verifikasi Email Universitas
        </Button>
      </div>
    </form>
  );
};
