import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingRoleSelectObjectSchema as StaffingRoleSelectObjectSchema } from './objects/StaffingRoleSelect.schema';
import { StaffingRoleCreateManyInputObjectSchema as StaffingRoleCreateManyInputObjectSchema } from './objects/StaffingRoleCreateManyInput.schema';

export const StaffingRoleCreateManyAndReturnSchema: z.ZodType<Prisma.StaffingRoleCreateManyAndReturnArgs> = z.object({ select: StaffingRoleSelectObjectSchema.optional(), data: z.union([ StaffingRoleCreateManyInputObjectSchema, z.array(StaffingRoleCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.StaffingRoleCreateManyAndReturnArgs>;

export const StaffingRoleCreateManyAndReturnZodSchema = z.object({ select: StaffingRoleSelectObjectSchema.optional(), data: z.union([ StaffingRoleCreateManyInputObjectSchema, z.array(StaffingRoleCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();