import type { Role } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import type { Context } from "../trpc/context";

type RoleType = keyof typeof Role;

export const authorize = (ctx: Context, roles: RoleType[]) => {
  if (!ctx.session || !ctx.session.user || !ctx.session.user.role) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  if (!roles.includes(ctx.session.user.role)) {
    throw new TRPCError({ code: "FORBIDDEN" });
  }
};
