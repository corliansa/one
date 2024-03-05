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
    }),
  )
  .mutation(
    async ({
      ctx,
      input: { name, birthDate, occupation, location, ppicabang },
    }) => {
      const userId = ctx.session.user.id;

      const currentUser = await ctx.prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          updated: true,
        },
      });

      console.log("update status: ", currentUser);

      if (currentUser) {
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
          },
        });

        if (!currentUser.updated) {
          // The user has not been marked as updated before, perform conditional logic
          // For example, log, send a notification, etc.
          console.log("User has updated their profile for the first time.");

          // Optionally, set updatedProfile to true if this is the first significant update
          // and you want to mark it as such
          await ctx.prisma.user.update({
            where: { id: userId },
            data: { updated: true },
          });
        }
      }
    },
  );
