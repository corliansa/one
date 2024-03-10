import { protectedProcedure } from "../../trpc";
import { ListPPICabang } from "../../../../Components/optionsList/ListPPICabang";

export const getPPICabangStats = protectedProcedure.query(
  async ({ ctx: { prisma } }) => {
    const statsPromises = ListPPICabang.map(
      ({ value: ppicabangValue, label }) => {
        // For each ppicabang, create a promise that resolves to an object with label, value, and count
        return prisma.user
          .count({ where: { ppicabang: ppicabangValue } })
          .then((count) => {
            return { label, value: ppicabangValue, count };
          });
      },
    );

    // Wait for all promises to resolve
    const stats = await Promise.all(statsPromises);

    // array of PPI Cabang and label
    return stats;
  },
);
