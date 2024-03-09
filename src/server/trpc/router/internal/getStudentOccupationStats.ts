import { protectedProcedure } from "../../trpc";

export const getStudentOccupationStats = protectedProcedure.query(
  async ({ ctx: { prisma } }) => {
    const promises = [];

    // Count bachelor, master, ausbildung, doctor, and researcher students
    promises.push(prisma.user.count({ where: { occupation: "bachelor" } }));
    promises.push(prisma.user.count({ where: { occupation: "master" } }));
    promises.push(prisma.user.count({ where: { occupation: "ausbildung" } }));
    promises.push(prisma.user.count({ where: { occupation: "doctor" } }));
    promises.push(prisma.user.count({ where: { occupation: "researcher" } }));

    const result = await Promise.all(promises);

    return result;
  },
);
