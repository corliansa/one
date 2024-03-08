import { protectedProcedure } from "../../trpc";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const saltRounds = 10; // The cost factor for generating the salt

export const generateVerificationToken = protectedProcedure
  .input(
    z.object({
      id: z.string(), // User ID to associate the token with
      email: z.string(), // User's email to send the token to
    }),
  )
  .mutation(async ({ ctx, input: { id, email } }) => {
    // Define an expiry date for the new token, e.g., 15 minutes from now
    const expires = new Date(new Date().getTime() + 15 * 60 * 1000);
    const token = uuidv4();
    const hashedToken = await bcrypt.hash(token, saltRounds);

    try {
      // Check if a token already exists for the given email or user ID
      const existingToken =
        await ctx.prisma.universityEmailVerificationToken.findFirst({
          where: {
            OR: [{ email: email }, { userId: id }],
          },
        });

      if (existingToken) {
        // Update the existing token (e.g., refresh the token value and expiry)
        const updatedToken =
          await ctx.prisma.universityEmailVerificationToken.update({
            where: {
              id: existingToken.id, // Use the existing token's ID for the update
            },
            data: {
              token: hashedToken, // Generate a new token
              expires: expires,
            },
          });
        return updatedToken;
      } else {
        // No existing token, create a new one

        const newToken =
          await ctx.prisma.universityEmailVerificationToken.create({
            data: {
              userId: id,
              email: email,
              token: hashedToken,
              expires: expires,
            },
          });
        return newToken;
      }
    } catch (error) {
      console.error("Failed to create or update verification token:", error);
      throw new Error("Failed to generate verification token");
    }
  });
