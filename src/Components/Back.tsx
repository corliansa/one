import { useRouter } from "next/router";

export const Back: React.FC = () => {
  const router = useRouter();
  return (
    <a
      onClick={() => router.back()}
      className="cursor-pointer rounded bg-white/10 p-1 text-6xl"
    >
      〱
    </a>
  );
};
