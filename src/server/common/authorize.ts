import { TRPCError } from "@trpc/server";
import type { RoleType } from "../../types";
import type { Context } from "../trpc/context";

export const authorize = (ctx: Context, roles: RoleType[]) => {
  if (process.env.NODE_ENV === "development") {
    console.log("Session : ", ctx.session)
    return 
  } 

  if (!ctx.session || !ctx.session.user || !ctx.session.user.role) {
    //throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  if (ctx.session?.user && !roles.includes(ctx.session.user.role)) {
    //throw new TRPCError({ code: "FORBIDDEN" });
  }
  
};
