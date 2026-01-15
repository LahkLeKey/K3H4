import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingShiftCreateManyInputObjectSchema as StaffingShiftCreateManyInputObjectSchema } from './objects/StaffingShiftCreateManyInput.schema';

export const StaffingShiftCreateManySchema: z.ZodType<Prisma.StaffingShiftCreateManyArgs> = z.object({ data: z.union([ StaffingShiftCreateManyInputObjectSchema, z.array(StaffingShiftCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.StaffingShiftCreateManyArgs>;

export const StaffingShiftCreateManyZodSchema = z.object({ data: z.union([ StaffingShiftCreateManyInputObjectSchema, z.array(StaffingShiftCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();