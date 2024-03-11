import { router } from "../trpc";
import { generateAndSendVerificationToken } from "./token/generateAndSendVerificationToken";
import { getVerificationTokenByUserId } from "./token/getVerificationTokenByUserId";
import { getVerificationTokenByUniEmail } from "./token/getVerificationTokenByUniEmail";
import { verifyUniVerificationToken } from "./token/verifyUniVerificationToken";

export const tokenRouter = router({
  generateAndSendVerificationToken,
  getVerificationTokenByUserId,
  getVerificationTokenByUniEmail,
  verifyUniVerificationToken,
});
