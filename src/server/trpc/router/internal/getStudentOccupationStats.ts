import { protectedProcedure } from "../../trpc";
import { z } from "zod";

export const getStudentOccupationStats = protectedProcedure
  .input(
    z.object({
      bundesland: z.string(),
    }),
  )
  .query(async ({ ctx: { prisma }, input: { bundesland } }) => {
    const promises = [];

    promises.push(
      prisma.user.count({
        where: {
          occupation: "bachelor",
          bundesland: bundesland,
        },
      }),
    );

    promises.push(
      prisma.user.count({
        where: {
          occupation: "master",
          bundesland: bundesland,
        },
      }),
    );

    promises.push(
      prisma.user.count({
        where: {
          occupation: "ausbildung",
          bundesland: bundesland,
        },
      }),
    );

    promises.push(
      prisma.user.count({
        where: {
          occupation: "doctor",
          bundesland: bundesland,
        },
      }),
    );

    promises.push(
      prisma.user.count({
        where: {
          occupation: "professor",
          bundesland: bundesland,
        },
      }),
    );

    const result = await Promise.all(promises);

    return result;
  });
