import { adminProcedure } from "../../trpc";

export const getAdmins = adminProcedure.query(async ({ ctx }) => {
  return await ctx.prisma.user.findMany({
    where: { role: "ADMIN" },
  });
});
