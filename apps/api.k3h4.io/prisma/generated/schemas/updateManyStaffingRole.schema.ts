import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingRoleUpdateManyMutationInputObjectSchema as StaffingRoleUpdateManyMutationInputObjectSchema } from './objects/StaffingRoleUpdateManyMutationInput.schema';
import { StaffingRoleWhereInputObjectSchema as StaffingRoleWhereInputObjectSchema } from './objects/StaffingRoleWhereInput.schema';

export const StaffingRoleUpdateManySchema: z.ZodType<Prisma.StaffingRoleUpdateManyArgs> = z.object({ data: StaffingRoleUpdateManyMutationInputObjectSchema, where: StaffingRoleWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.StaffingRoleUpdateManyArgs>;

export const StaffingRoleUpdateManyZodSchema = z.object({ data: StaffingRoleUpdateManyMutationInputObjectSchema, where: StaffingRoleWhereInputObjectSchema.optional() }).strict();