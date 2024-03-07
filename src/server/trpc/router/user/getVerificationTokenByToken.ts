import { protectedProcedure } from "../../trpc";
import { z } from "zod";

export const getVerificationTokenByToken = protectedProcedure
  .input(
    z.object({
      token: z.string(),
    }),
  )
  .query(async ({ ctx, input: { token } }) => {
    try {
      const currentDateTime = new Date(); // Get the current date and time
      const tokenRecord =
        await ctx.prisma.universityEmailVerificationToken.findUnique({
          where: {
            token,
          },
        });

      // Check if the token was found and has not expired
      if (tokenRecord && tokenRecord.expires > currentDateTime) {
        return tokenRecord;
      } else {
        // Token not found or has expired
        return null;
      }
    } catch (error) {
      console.error("Error retrieving verification token:", error);
      return null;
    }
  });
