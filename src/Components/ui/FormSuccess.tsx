import { CheckCircleIcon } from "@heroicons/react/24/outline";

interface FormSuccessProps {
  message: string | undefined;
}

export const FormSuccess: React.FC<FormSuccessProps> = ({
  message,
}: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="flex items-center gap-x-2 rounded-md border-2 border-emerald-500 p-3 text-sm text-emerald-500">
      <CheckCircleIcon className="h-10 w-10" />
      <p>{message}</p>
    </div>
  );
};
