import { authorize } from "./../../../common/authorize";
import { protectedProcedure } from "../../trpc";
import { z } from "zod";
import { RoleZod, StatusZod, VerificationZod } from "../../../../types";

export const getUsers = protectedProcedure
  .input(
    z
      .object({
        role: RoleZod,
        verification: VerificationZod,
        status: StatusZod,
      })
      .optional()
  )
  .query(async ({ ctx, input }) => {
    authorize(ctx, ["ADMIN"]);
    return await ctx.prisma.user.findMany({
      where: input ? { ...input } : undefined,
    });
  });
