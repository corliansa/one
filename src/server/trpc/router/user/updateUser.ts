import { z } from "zod";
import { protectedProcedure } from "../../trpc";

export const updateUser = protectedProcedure
  .input(
    z.object({
      name: z.string(),
      birthDate: z.date().optional(),
      occupation: z.string(),
      location: z.string(),
      ppicabang: z.string().optional(),
      fieldOfStudy: z.string().optional(),
      expectedGraduation: z.date().optional(),
      bundesland: z.string().optional(),
    }),
  )
  .mutation(
    async ({
      ctx,
      input: {
        name,
        birthDate,
        occupation,
        location,
        ppicabang,
        fieldOfStudy,
        expectedGraduation,
        bundesland,
      },
    }) => {
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
          ppicabang,
          fieldOfStudy,
          expectedGraduation,
          bundesland,
        },
      });
    },
  );
