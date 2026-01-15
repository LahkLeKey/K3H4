import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingRoleSelectObjectSchema as StaffingRoleSelectObjectSchema } from './objects/StaffingRoleSelect.schema';
import { StaffingRoleIncludeObjectSchema as StaffingRoleIncludeObjectSchema } from './objects/StaffingRoleInclude.schema';
import { StaffingRoleWhereUniqueInputObjectSchema as StaffingRoleWhereUniqueInputObjectSchema } from './objects/StaffingRoleWhereUniqueInput.schema';

export const StaffingRoleDeleteOneSchema: z.ZodType<Prisma.StaffingRoleDeleteArgs> = z.object({ select: StaffingRoleSelectObjectSchema.optional(), include: StaffingRoleIncludeObjectSchema.optional(), where: StaffingRoleWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.StaffingRoleDeleteArgs>;

export const StaffingRoleDeleteOneZodSchema = z.object({ select: StaffingRoleSelectObjectSchema.optional(), include: StaffingRoleIncludeObjectSchema.optional(), where: StaffingRoleWhereUniqueInputObjectSchema }).strict();