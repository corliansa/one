import { z } from "zod";
import { protectedProcedure } from "../../trpc";

export const getStatistics = protectedProcedure
  .input(
    z.object({
      bundesland: z.string().optional(),
    }),
  )
  .query(async ({ ctx: { prisma }, input: { bundesland } }) => {
    const users = await prisma.user.count({
      where: { bundesland },
    });
    const verified = await prisma.user.count({
      where: { verification: "VERIFIED", bundesland },
    });
    const unverified = await prisma.user.count({
      where: { verification: "UNVERIFIED", bundesland },
    });
    const rejected = await prisma.user.count({
      where: { verification: "REJECTED", bundesland },
    });
    const active = await prisma.user.count({
      where: { status: "ACTIVE", bundesland },
    });
    const inactive = await prisma.user.count({
      where: { status: "INACTIVE", bundesland },
    });
    const updated = await prisma.user.count({
      where: { updated: false, bundesland },
    });
    const vocation = await prisma.user.count({
      where: { occupation: "ausbildung", bundesland },
    });
    const bachelor = await prisma.user.count({
      where: { occupation: "bachelor", bundesland },
    });
    const master = await prisma.user.count({
      where: { occupation: "master", bundesland },
    });
    const doctorand = await prisma.user.count({
      where: { occupation: "doctor", bundesland }, // i.e. doctorand
    });
    const professor = await prisma.user.count({
      where: { occupation: "professor", bundesland },
    });
    const female = await prisma.user.count({
      where: { gender: "Perempuan", bundesland },
    });
    const male = await prisma.user.count({
      where: { gender: "Laki-Laki", bundesland },
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
  });
