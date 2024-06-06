import { protectedProcedure } from "../../trpc";

export const getStatistics = protectedProcedure.query(
  async ({ ctx: { prisma } }) => {
    const users = await prisma.user.count();
    const verified = await prisma.user.count({
      where: { verification: "VERIFIED" },
    });
    const unverified = await prisma.user.count({
      where: { verification: "UNVERIFIED" },
    });
    const rejected = await prisma.user.count({
      where: { verification: "REJECTED" },
    });
    const active = await prisma.user.count({ where: { status: "ACTIVE" } });
    const inactive = await prisma.user.count({ where: { status: "INACTIVE" } });
    const updated = await prisma.user.count({ where: { updated: false } });
    const vocation = await prisma.user.count({
      where: { occupation: "ausbildung" },
    });
    const bachelor = await prisma.user.count({
      where: { occupation: "bachelor" },
    });
    const master = await prisma.user.count({ where: { occupation: "master" } });
    const doctorand = await prisma.user.count({
      where: { occupation: "doctor" }, // i.e. doctorand
    });
    const professor = await prisma.user.count({
      where: { occupation: "professor" },
    });
    const female = await prisma.user.count({
      where: { gender: "Perempuan" },
    });
    const male = await prisma.user.count({
      where: { gender: "Laki-Laki" },
    });

    return {
      users,
      verified,
      unverified,
      rejected,
      active,
      inactive,
      updated,
      vocation,
      bachelor,
      master,
      doctorand,
      professor,
      female,
      male,
    };
  },
);
