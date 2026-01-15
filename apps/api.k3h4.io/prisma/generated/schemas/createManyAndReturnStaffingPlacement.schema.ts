import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingPlacementSelectObjectSchema as StaffingPlacementSelectObjectSchema } from './objects/StaffingPlacementSelect.schema';
import { StaffingPlacementCreateManyInputObjectSchema as StaffingPlacementCreateManyInputObjectSchema } from './objects/StaffingPlacementCreateManyInput.schema';

export const StaffingPlacementCreateManyAndReturnSchema: z.ZodType<Prisma.StaffingPlacementCreateManyAndReturnArgs> = z.object({ select: StaffingPlacementSelectObjectSchema.optional(), data: z.union([ StaffingPlacementCreateManyInputObjectSchema, z.array(StaffingPlacementCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.StaffingPlacementCreateManyAndReturnArgs>;

export const StaffingPlacementCreateManyAndReturnZodSchema = z.object({ select: StaffingPlacementSelectObjectSchema.optional(), data: z.union([ StaffingPlacementCreateManyInputObjectSchema, z.array(StaffingPlacementCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();