import { router } from "../trpc";
import { generateVerificationToken } from "./token/generateVerificationToken";
import { getVerificationTokenByToken } from "./token/getVerificationTokenByToken";
import { getVerificationTokenByUniEmail } from "./token/getVerificationTokenByUniEmail";

export const tokenRouter = router({
  generateVerificationToken,
  getVerificationTokenByToken,
  getVerificationTokenByUniEmail,
});
