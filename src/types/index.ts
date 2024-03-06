import type { Role, Status, Verification } from "@prisma/client";
import { z } from "zod";

export type RoleType = keyof typeof Role;
export type VerificationType = keyof typeof Verification;
export type StatusType = keyof typeof Status;

export const Roles = ["USER", "ADMIN"] as const;
export const Verifications = ["VERIFIED", "UNVERIFIED", "REJECTED"] as const;
export const Statuses = ["ACTIVE", "INACTIVE"] as const; 

export const RoleZod = z.enum(Roles).optional();
export const VerificationZod = z.enum(Verifications).optional();
export const StatusZod = z.enum(Statuses).optional();