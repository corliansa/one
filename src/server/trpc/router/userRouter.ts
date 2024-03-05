import { updateUserById } from "./user/updateUserById";
import { getUserById } from "./user/getUserById";
import { updateUser } from "./user/updateUser";
import { router } from "../trpc";
import { getSession } from "./user/getSession";
import { getUser } from "./user/getUser";
import { getUsers } from "./user/getUsers";


export const userRouter = router({
  getSession,
  getUser,
  updateUser,
  getUsers,
  getUserById,
  updateUserById,
});
