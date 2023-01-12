import { router } from "../trpc";
import { internalRouter } from "./internalRouter";
import { userRouter } from "./userRouter";

export const appRouter = router({
  user: userRouter,
  internal: internalRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
