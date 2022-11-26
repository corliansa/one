import { authorize } from "./../../../common/authorize";
import { protectedProcedure } from "../../trpc";
import { z } from "zod";

export const getUserById = protectedProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ ctx, input: { id } }) => {
    authorize(ctx, ["ADMIN"]);
    return await ctx.prisma.user.findUniqueOrThrow({ where: { id } });
  });
