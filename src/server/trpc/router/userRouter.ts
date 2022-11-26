import { updateUser } from "./user/updateUser";
import { router } from "../trpc";
import { getSession } from "./user/getSession";
import { getUser } from "./user/getUser";

export const userRouter = router({
  getSession,
  getUser,
  updateUser,
});
