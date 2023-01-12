import { protectedProcedure } from "../../trpc";

export const getStatistics = protectedProcedure.query(
  async ({ ctx: { prisma } }) => {
    const promises = [];
    promises.push(prisma.user.count());
    promises.push(prisma.user.count({ where: { verification: "VERIFIED" } }));
    promises.push(prisma.user.count({ where: { verification: "UNVERIFIED" } }));
    promises.push(prisma.user.count({ where: { verification: "REJECTED" } }));
    promises.push(prisma.user.count({ where: { status: "ACTIVE" } }));
    promises.push(prisma.user.count({ where: { status: "INACTIVE" } }));
    const result = await Promise.all(promises);

    return result;
  }
);
