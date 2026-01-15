import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingRoleSelectObjectSchema as StaffingRoleSelectObjectSchema } from './objects/StaffingRoleSelect.schema';
import { StaffingRoleIncludeObjectSchema as StaffingRoleIncludeObjectSchema } from './objects/StaffingRoleInclude.schema';
import { StaffingRoleCreateInputObjectSchema as StaffingRoleCreateInputObjectSchema } from './objects/StaffingRoleCreateInput.schema';
import { StaffingRoleUncheckedCreateInputObjectSchema as StaffingRoleUncheckedCreateInputObjectSchema } from './objects/StaffingRoleUncheckedCreateInput.schema';

export const StaffingRoleCreateOneSchema: z.ZodType<Prisma.StaffingRoleCreateArgs> = z.object({ select: StaffingRoleSelectObjectSchema.optional(), include: StaffingRoleIncludeObjectSchema.optional(), data: z.union([StaffingRoleCreateInputObjectSchema, StaffingRoleUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.StaffingRoleCreateArgs>;

export const StaffingRoleCreateOneZodSchema = z.object({ select: StaffingRoleSelectObjectSchema.optional(), include: StaffingRoleIncludeObjectSchema.optional(), data: z.union([StaffingRoleCreateInputObjectSchema, StaffingRoleUncheckedCreateInputObjectSchema]) }).strict();