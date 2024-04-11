import { z } from "zod";
import { protectedProcedure } from "../../trpc";

const deleteUserInput = z.object({
  userId: z.string(),
});

export const deleteUserById = protectedProcedure
  .input(deleteUserInput)
  .mutation(async ({ ctx, input }) => {
    const userId = input.userId;

    await ctx.prisma.user.delete({
      where: {
        id: userId,
      },
    });
  });
