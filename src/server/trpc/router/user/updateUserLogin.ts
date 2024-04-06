import { z } from "zod";
import { protectedProcedure } from "../../trpc";

/**
 * Updates a user by their ID.
 *
 * @param {Object} input - The input object containing the user's ID, role, verification, status, and affiliation.
 * @param {string} input.id - The ID of the user to update.
 * @param {Role} input.role - The new role of the user.
 * @param {Verification} input.verification - The new verification status of the user.
 * @param {Status} input.status - The new status of the user.
 * @param {string[]} [input.affiliation] - The new affiliations of the user (optional).
 * @returns {Promise<User>} - A promise that resolves to the updated user.
 */
export const updateUserLogin = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      name: z.string(),
      birthDate: z.date().optional(),
      occupation: z.string(),
      location: z.string(),
      fieldOfStudy: z.string(),
      studySpecialization: z.string().optional(),
      bundesland: z.string(),
      expectedGraduation: z.date().optional(),
      ppicabang: z.string(),
      agreedToTermsAndCond: z.boolean(),
      forwardDataThirdParty: z.boolean().optional(),
      subscribeNewsletterEmail: z.boolean().optional(),
    }),
  )
  .mutation(
    async ({
      ctx,
      input: {
        id,
        name,
        birthDate,
        occupation,
        location,
        ppicabang,
        bundesland,
        expectedGraduation,
        studySpecialization,
        fieldOfStudy,
        agreedToTermsAndCond,
        forwardDataThirdParty,
        subscribeNewsletterEmail,
      },
    }) => {
      return await ctx.prisma.user.update({
        where: { id },
        data: {
          name,
          birthDate,
          occupation,
          location,
          ppicabang,
          bundesland,
          fieldOfStudy,
          studySpecialization,
          expectedGraduation,
          updated: true,
          agreedToTermsAndCond,
          agreedToTermsAndCondDate: new Date(),
          forwardDataThirdParty,
          forwardDataThirdPartyDate: new Date(),
          subscribeNewsletterEmail,
        },
      });
    },
  );
