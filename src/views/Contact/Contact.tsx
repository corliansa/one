import Head from "next/head";
import { CustomBackground } from "../../Components/Background";

export const Contact: React.FC = () => {
  return (
    <>
      <Head>
        <title>Contact</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="isolate bg-white">
        <CustomBackground />

        <div className="flex min-h-screen flex-col items-center justify-center gap-3">
          <h1 className="text-xl font-bold">Contact</h1>
          <h2 className="text-lg">Work In Progress</h2>
        </div>
      </div>
    </>
  );
};
