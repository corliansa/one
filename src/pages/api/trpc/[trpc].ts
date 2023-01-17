import { createNextApiHandler } from "@trpc/server/adapters/next";

import { env } from "../../../env/server.mjs";
import { createContext } from "../../../server/trpc/context";
import { appRouter } from "../../../server/trpc/router/_app";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext,
  onError: async ({ path, error, ctx }) => {
    await ctx?.prisma.audit.update({
      where: { id: ctx?.auditId },
      data: { error: error.message, success: false },
    });
    env.NODE_ENV === "development" &&
      console.error(`❌ tRPC failed on ${path}: ${error}`);
  },
});
