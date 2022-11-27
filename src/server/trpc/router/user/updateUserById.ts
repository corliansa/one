import { authorize } from "./../../../common/authorize";
import { protectedProcedure } from "../../trpc";
import { z } from "zod";
import { RoleZod, StatusZod, VerificationZod } from "../../../../types";

export const updateUserById = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      role: RoleZod,
      verification: VerificationZod,
      status: StatusZod,
      affiliation: z.array(z.string()).optional(),
    })
  )
  .mutation(
    async ({ ctx, input: { id, role, verification, status, affiliation } }) => {
      authorize(ctx, ["ADMIN"]);
      return await ctx.prisma.user.update({
        where: { id },
        data: { role, verification, status, affiliation },
      });
    }
  );
