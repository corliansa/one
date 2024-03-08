import { useRouter } from "next/router";

export const VerifyTokenPage = () => {
  const router = useRouter();
  const token = router.query.token;
  return (
    <div>
      <h1>Verify Token</h1>
      <p>
        This page is a placeholder for the Verify Token page. You can access
        this page at <code>/verify-token</code>.
      </p>
      Your token: {token}
    </div>
  );
};

export default VerifyTokenPage;
