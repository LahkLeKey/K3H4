import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingRoleSelectObjectSchema as StaffingRoleSelectObjectSchema } from './objects/StaffingRoleSelect.schema';
import { StaffingRoleIncludeObjectSchema as StaffingRoleIncludeObjectSchema } from './objects/StaffingRoleInclude.schema';
import { StaffingRoleWhereUniqueInputObjectSchema as StaffingRoleWhereUniqueInputObjectSchema } from './objects/StaffingRoleWhereUniqueInput.schema';

export const StaffingRoleFindUniqueSchema: z.ZodType<Prisma.StaffingRoleFindUniqueArgs> = z.object({ select: StaffingRoleSelectObjectSchema.optional(), include: StaffingRoleIncludeObjectSchema.optional(), where: StaffingRoleWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.StaffingRoleFindUniqueArgs>;

export const StaffingRoleFindUniqueZodSchema = z.object({ select: StaffingRoleSelectObjectSchema.optional(), include: StaffingRoleIncludeObjectSchema.optional(), where: StaffingRoleWhereUniqueInputObjectSchema }).strict();