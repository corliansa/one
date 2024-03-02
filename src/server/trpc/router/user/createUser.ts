// is this even necessary?

import { z } from "zod";
import { protectedProcedure } from "../../trpc";

export const createUser = protectedProcedure
  .input(
    z.object({
      name: z.string(),
      email: z.string().email(), // Assuming you want to collect email addresses
      birthDate: z.date().optional(), // Keep optional or remove if not needed
      occupation: z.string().optional(),
      location: z.string().optional(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    // Assuming a role or other properties are set by default or inferred from context
    // You might want to enforce certain properties or roles based on the session or application logic

    const newUser = await ctx.prisma.user.create({
      data: {
        name: input.name,
        email: input.email, // Make sure to handle uniqueness at the database level or here in your logic
        birthDate: input.birthDate,
        occupation: input.occupation,
        location: input.location,
        // Add other fields as necessary, like role, based on your application's requirements
      },
    });

    // Depending on your application, you might want to return the created user
    // or a specific subset of the user's information
    return newUser;
  });
