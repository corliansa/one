import { protectedProcedure } from "../../trpc";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

export const generateVerificationToken = protectedProcedure
  .input(
    z.object({
      userId: z.string(), // Ensure you have a 'userId' to associate with the token
      email: z.string(), // Assuming you also need the user's email to send the token to
    }),
  )
  .mutation(async ({ ctx, input: { userId, email } }) => {
    // Generate a secure token
    const token = uuidv4();

    // Define an expiry date for the token, e.g., 24 hours from now
    const expires = new Date(new Date().getTime() + 15 * 60 * 1000);

    try {
      // Attempt to save the token to the database
      const verificationToken =
        await ctx.prisma.universityEmailVerificationToken.create({
          data: {
            userId,
            email, // Make sure your model supports this if you intend to use it
            token,
            expires: expires,
          },
        });

      // Here, implement your logic to send the token to the user's email
      // This might involve calling another service or function

      return verificationToken;
    } catch (error) {
      console.error("Failed to create verification token:", error);
      throw new Error("Failed to generate verification token");
    }
  });
