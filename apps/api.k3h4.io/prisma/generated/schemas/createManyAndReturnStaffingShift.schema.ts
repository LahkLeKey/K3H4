import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingShiftSelectObjectSchema as StaffingShiftSelectObjectSchema } from './objects/StaffingShiftSelect.schema';
import { StaffingShiftCreateManyInputObjectSchema as StaffingShiftCreateManyInputObjectSchema } from './objects/StaffingShiftCreateManyInput.schema';

export const StaffingShiftCreateManyAndReturnSchema: z.ZodType<Prisma.StaffingShiftCreateManyAndReturnArgs> = z.object({ select: StaffingShiftSelectObjectSchema.optional(), data: z.union([ StaffingShiftCreateManyInputObjectSchema, z.array(StaffingShiftCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.StaffingShiftCreateManyAndReturnArgs>;

export const StaffingShiftCreateManyAndReturnZodSchema = z.object({ select: StaffingShiftSelectObjectSchema.optional(), data: z.union([ StaffingShiftCreateManyInputObjectSchema, z.array(StaffingShiftCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();