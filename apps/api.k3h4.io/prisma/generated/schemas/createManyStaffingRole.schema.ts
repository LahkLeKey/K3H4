import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingRoleCreateManyInputObjectSchema as StaffingRoleCreateManyInputObjectSchema } from './objects/StaffingRoleCreateManyInput.schema';

export const StaffingRoleCreateManySchema: z.ZodType<Prisma.StaffingRoleCreateManyArgs> = z.object({ data: z.union([ StaffingRoleCreateManyInputObjectSchema, z.array(StaffingRoleCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.StaffingRoleCreateManyArgs>;

export const StaffingRoleCreateManyZodSchema = z.object({ data: z.union([ StaffingRoleCreateManyInputObjectSchema, z.array(StaffingRoleCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();