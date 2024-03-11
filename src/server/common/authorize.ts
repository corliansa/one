/**
 * Authorizes the user based on their role.
 * Throws an error if the user is not authorized.
 * 
 * @param ctx - The context object containing session information.
 * @param roles - An array of role types that are allowed to access the resource.
 * @throws {TRPCError} - Throws an error with code "UNAUTHORIZED" if the user is not authenticated,
 * or throws an error with code "FORBIDDEN" if the user is authenticated but not authorized.
 */
import { TRPCError } from "@trpc/server";
import type { RoleType } from "../../types";
import type { Context } from "../trpc/context";

export const authorize = (ctx: Context, roles: RoleType[]) => {
  if (process.env.NODE_ENV === "development") {
    console.log("Session : ", ctx.session)
    return 
  } 

  if (!ctx.session || !ctx.session.user || !ctx.session.user.role) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  if (ctx.session?.user && !roles.includes(ctx.session.user.role)) {
    throw new TRPCError({ code: "FORBIDDEN" });
  }
  
};
