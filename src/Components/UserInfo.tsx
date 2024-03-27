import { Card } from "./Card";
import { capitalize } from "../utils/capitalize";
import type { RouterOutputs } from "../utils/trpc";

type UserInfoProps = {
  user: RouterOutputs["user"]["getUser"];
};

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const userInfo = [
    { label: "Email", value: user.email },
    { label: "Role", value: capitalize(user.role) },
    { label: "Status", value: capitalize(user.status) },
    {
      label: "Verified",
      value: user.verification === "VERIFIED" ? "Yes" : "No",
    },
    {
      label: "Birth date",
      value: user.birthDate?.toLocaleDateString() ?? "N/A",
    },
    { label: "Occupation", value: capitalize(user.occupation ?? "N/A") },
    {
      label: "Field of Study",
      value: capitalize(user.fieldOfStudy ?? "N/A"),
    },
    {
      label: "Study Specialization",
      value: user.studySpecialization ?? "N/A",
    },
    {
      label: "Expected Graduation",
      value: user.expectedGraduation?.toLocaleDateString() ?? "N/A",
    },
    { label: "Bundesland", value: capitalize(user.bundesland ?? "N/A") },
    { label: "Location", value: capitalize(user.location ?? "N/A") },
    { label: "PPI Cabang", value: user.ppicabang ?? "N/A" },
  ];
  return (
    <Card className="flex w-full flex-col gap-2">
      <h2 className="text-2xl font-semibold">{user.name}</h2>

      {userInfo.map(({ label, value }) => (
        <div key={label}>
          <span className="font-bold">{label}: </span>
          {value}
        </div>
      ))}
    </Card>
  );
};
