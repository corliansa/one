import type { RoleType, StatusType, VerificationType } from "../../types";
import { Roles, Statuses, Verifications } from "../../types";
import { useState } from "react";
import { Button, FormField, SelectField, TagInput } from "evergreen-ui";
import type { RouterOutputs } from "../../utils/trpc";
import { trpc } from "../../utils/trpc";
import { Card } from "../../Components";
import { capitalize } from "../../utils/capitalize";
import { ListPPICabang } from "../../Components/optionsList/ListPPICabang";

export const UserForm: React.FC<{
  user: RouterOutputs["user"]["getUserById"];
}> = ({ user }) => {
  const [role, setRole] = useState(user.role ?? "USER");
  const [verification, setVerification] = useState(
    user.verification ?? "UNVERIFIED",
  );
  const [status, setStatus] = useState(user.status ?? "ACTIVE");
  const [affiliation, setAffiliation] = useState<string[]>(
    user.affiliation ?? [],
  );
  const [ppicabang, setPpiCabang] = useState(user.ppicabang ?? "");

  // useContext is deprecated, use useUtils instead
  const queryClient = trpc.useUtils();
  const { mutateAsync: updateUserById, isLoading } =
    trpc.user.updateUserById.useMutation({
      onSuccess: () => {
        queryClient.user.getUserById.invalidate({ id: user.id }),
          window.location.reload();
      },
    });
    //TODO: Handle the logic for PPI Cabang branch admins, so that they cannot change the PPI Cabang value of each users but can see the data and assign role as PPI Cabang admins.
  return (
    <>
      <Card>
        <div className="flex flex-col">
          <SelectField
            marginBottom={8}
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value as RoleType)}
          >
            {Roles.map((role) => (
              <option key={role} value={role}>
                {capitalize(role)}
              </option>
            ))}
          </SelectField>
          <SelectField
            marginBottom={8}
            label="Verification"
            value={verification}
            onChange={(e) =>
              setVerification(e.target.value as VerificationType)
            }
          >
            {Verifications.map((verification) => (
              <option key={verification} value={verification}>
                {capitalize(verification)}
              </option>
            ))}
          </SelectField>
          <SelectField
            marginBottom={8}
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value as StatusType)}
          >
            {Statuses.map((status) => (
              <option key={status} value={status}>
                {capitalize(status)}
              </option>
            ))}
          </SelectField>
          <FormField marginBottom={12} width="100%" label="Affiliation">
            <TagInput
              width="100%"
              id="affiliation"
              values={affiliation}
              onChange={(values: string[]) => {
                setAffiliation(values);
              }}
            />
          </FormField>
          <SelectField
            marginBottom={8}
            label="PPI Cabang"
            value={ppicabang}
            disabled={isLoading}
            description="PPI Cabang pengguna"
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

          <Button
            onClick={async () =>
              await updateUserById({
                id: user.id,
                role,
                verification,
                status,
                affiliation,
                ppicabang,
              })
            }
            isLoading={isLoading}
            className="mt-5"
          >
            Update user
          </Button>
        </div>
      </Card>
    </>
  );
};
