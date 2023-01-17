import { protectedProcedure } from "../../trpc";

export const getAdmins = protectedProcedure.query(async ({ ctx }) => {
  return await ctx.prisma.user.findMany({
    where: { role: "ADMIN" },
  });
});
