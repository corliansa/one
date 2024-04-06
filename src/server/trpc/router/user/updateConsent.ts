import { z } from "zod";
import { protectedProcedure } from "../../trpc";

export const updateConsent = protectedProcedure
  .input(
    z.object({
      agreedToTermsAndCond: z.boolean(),
      forwardDataThirdParty: z.boolean().optional(),
      subscribeNewsletterEmail: z.boolean().optional(),
    }),
  )
  .mutation(
    async ({
      ctx,
      input: {
        agreedToTermsAndCond,
        forwardDataThirdParty,
        subscribeNewsletterEmail,
      },
    }) => {
      const userId = ctx.session.user.id;

      await ctx.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          agreedToTermsAndCond,
          agreedToTermsAndCondDate: new Date(),
          forwardDataThirdParty,
          forwardDataThirdPartyDate: new Date(),
          // TODO: add more consent fields here
          subscribeNewsletterEmail,
        },
      });
    },
  );
