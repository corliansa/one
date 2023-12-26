
import { User } from "@prisma/client";
import { protectedProcedure } from "../../trpc";

export const getUser = protectedProcedure.query(async ({ ctx }) => {
  
  const userId = ctx?.session?.user?.id 
  
  return await ctx.prisma.user.findFirst({
    where: {
      id: userId || "123",
    },
  });
});
