import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingRoleWhereInputObjectSchema as StaffingRoleWhereInputObjectSchema } from './objects/StaffingRoleWhereInput.schema';

export const StaffingRoleDeleteManySchema: z.ZodType<Prisma.StaffingRoleDeleteManyArgs> = z.object({ where: StaffingRoleWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.StaffingRoleDeleteManyArgs>;

export const StaffingRoleDeleteManyZodSchema = z.object({ where: StaffingRoleWhereInputObjectSchema.optional() }).strict();