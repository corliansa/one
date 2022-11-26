import { publicProcedure } from "../../trpc";

export const getSession = publicProcedure.query(({ ctx }) => {
  return ctx.session;
});
