import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Dashboard } from "../../views/Dashboard";
import { FederalStateContext } from "../../views/Dashboard/FederalStateContext";

const UserPage: NextPage = () => {
  const { query } = useRouter();
  return (
    <FederalStateContext.Provider value={query.state as string}>
      <Dashboard />
    </FederalStateContext.Provider>
  );
};

export default UserPage;
