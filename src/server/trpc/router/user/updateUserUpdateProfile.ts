import { z } from "zod";
import { protectedProcedure } from "../../trpc";

export const updateUserUpdateProfile = protectedProcedure
  .input(
    z.object({
      name: z.string(),
      birthDate: z.date().optional(),
      occupation: z.string(),
      location: z.string(),
    })
  )
  .mutation(async ({ ctx, input: { name, birthDate, occupation, location } }) => {
    const userId = ctx.session.user.id;

    await ctx.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        birthDate,
        occupation,
        location,
      },
    });
  });
