import { protectedProcedure } from "../../trpc";

export const getUser = protectedProcedure.query(({ ctx }) => {
  const userId = ctx.session.user.id;
  return ctx.prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });
});
