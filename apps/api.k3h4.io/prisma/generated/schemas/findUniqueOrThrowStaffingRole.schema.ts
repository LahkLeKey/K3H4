import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingRoleSelectObjectSchema as StaffingRoleSelectObjectSchema } from './objects/StaffingRoleSelect.schema';
import { StaffingRoleIncludeObjectSchema as StaffingRoleIncludeObjectSchema } from './objects/StaffingRoleInclude.schema';
import { StaffingRoleWhereUniqueInputObjectSchema as StaffingRoleWhereUniqueInputObjectSchema } from './objects/StaffingRoleWhereUniqueInput.schema';

export const StaffingRoleFindUniqueOrThrowSchema: z.ZodType<Prisma.StaffingRoleFindUniqueOrThrowArgs> = z.object({ select: StaffingRoleSelectObjectSchema.optional(), include: StaffingRoleIncludeObjectSchema.optional(), where: StaffingRoleWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.StaffingRoleFindUniqueOrThrowArgs>;

export const StaffingRoleFindUniqueOrThrowZodSchema = z.object({ select: StaffingRoleSelectObjectSchema.optional(), include: StaffingRoleIncludeObjectSchema.optional(), where: StaffingRoleWhereUniqueInputObjectSchema }).strict();