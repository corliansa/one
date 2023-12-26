import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";

import { type Context } from "./context";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;

/**
 * Unprotected procedure
 **/
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure;
/**
 * Reusable middleware to ensure
 * users are logged in

const isAuthed = t.middleware(async ({ ctx, next, path, input }) => {
  if (!ctx.session || !ctx.session.user) {
    //throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  const audit = await ctx.prisma.audit.create({
    data: {
      userId: ctx?.session?.user?.id || "test",
      action: path,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      input: input as any,
    },
  });
  if (!audit.id) {
    console.warn("Failed to audit request")
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to audit request",
    });
  }
  ctx.auditId = audit.id;
  const user = {
    id: "test",
    role: "ADMIN",
    status: "ACTIVE",
    verification: "VERIFIED",
    name: "test name",
    email: "test@gmail.com"
}
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: {user},
      auditId: audit.id,
    },
  });
});

/**
 * Protected procedure

export const protectedProcedure = t.procedure.use(isAuthed);
 **/