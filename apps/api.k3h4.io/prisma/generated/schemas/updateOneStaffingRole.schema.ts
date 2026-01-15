import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingRoleSelectObjectSchema as StaffingRoleSelectObjectSchema } from './objects/StaffingRoleSelect.schema';
import { StaffingRoleIncludeObjectSchema as StaffingRoleIncludeObjectSchema } from './objects/StaffingRoleInclude.schema';
import { StaffingRoleUpdateInputObjectSchema as StaffingRoleUpdateInputObjectSchema } from './objects/StaffingRoleUpdateInput.schema';
import { StaffingRoleUncheckedUpdateInputObjectSchema as StaffingRoleUncheckedUpdateInputObjectSchema } from './objects/StaffingRoleUncheckedUpdateInput.schema';
import { StaffingRoleWhereUniqueInputObjectSchema as StaffingRoleWhereUniqueInputObjectSchema } from './objects/StaffingRoleWhereUniqueInput.schema';

export const StaffingRoleUpdateOneSchema: z.ZodType<Prisma.StaffingRoleUpdateArgs> = z.object({ select: StaffingRoleSelectObjectSchema.optional(), include: StaffingRoleIncludeObjectSchema.optional(), data: z.union([StaffingRoleUpdateInputObjectSchema, StaffingRoleUncheckedUpdateInputObjectSchema]), where: StaffingRoleWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.StaffingRoleUpdateArgs>;

export const StaffingRoleUpdateOneZodSchema = z.object({ select: StaffingRoleSelectObjectSchema.optional(), include: StaffingRoleIncludeObjectSchema.optional(), data: z.union([StaffingRoleUpdateInputObjectSchema, StaffingRoleUncheckedUpdateInputObjectSchema]), where: StaffingRoleWhereUniqueInputObjectSchema }).strict();