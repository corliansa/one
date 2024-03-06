import Head from "next/head";
import { Base, Card } from "../../Components";
import { VerifyForm } from "./VerifyForm";

const VerifyPage = () => {
  return (
    <>
      <Head>
        <title>ONE | Verify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Base title="Verify Email Uni">
        <div className="py-4">
          <Card>
            <VerifyForm />
          </Card>
        </div>
      </Base>
    </>
  );
};

export default VerifyPage;
