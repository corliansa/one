import { authorize } from "./../../../common/authorize";
import { protectedProcedure } from "../../trpc";

export const getUsers = protectedProcedure.query(async ({ ctx }) => {
  authorize(ctx, ["ADMIN"]);
  return await ctx.prisma.user.findMany({});
});
