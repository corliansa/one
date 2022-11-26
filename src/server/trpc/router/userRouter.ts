import { updateUser } from "./auth/updateUser";
import { router } from "../trpc";
import { getSession } from "./auth/getSession";
import { getUser } from "./auth/getUser";

export const userRouter = router({
  getSession,
  getUser,
  updateUser,
});
