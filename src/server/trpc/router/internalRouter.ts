import { getAdmins } from "./internal/getAdmins";
import { router } from "../trpc";
import { getStatistics } from "./internal/getStatistics";

export const internalRouter = router({
  getStatistics,
  getAdmins,
});
