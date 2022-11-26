import { useRouter } from "next/router";

export const Back: React.FC = () => {
  const router = useRouter();
  return (
    <a
      onClick={() => router.back()}
      className="cursor-pointer rounded bg-white/20 p-1 text-6xl"
    >
      ←
    </a>
  );
};
