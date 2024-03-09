import { getAdmins } from "./internal/getAdmins";
import { router } from "../trpc";
import { getStatistics } from "./internal/getStatistics";
import { getPPICabangStats } from "./internal/getPPICabangStats";
import { getStudentOccupationStats } from "./internal/getStudentOccupationStats";

export const internalRouter = router({
  getStatistics,
  getAdmins,
  getPPICabangStats,
  getStudentOccupationStats,
});
