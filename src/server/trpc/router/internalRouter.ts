import { router } from "../trpc";
import { getAdmins } from "./internal/getAdmins";
import { getPPICabangStats } from "./internal/getPPICabangStats";
import { getAdminStatistics, getStatistics } from "./internal/getStatistics";
import { getStudentOccupationStats } from "./internal/getStudentOccupationStats";

export const internalRouter = router({
  getStatistics,
  getAdmins,
  getPPICabangStats,
  getStudentOccupationStats,
  getAdminStatistics,
});
