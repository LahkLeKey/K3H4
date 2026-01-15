import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingPlacementCreateManyInputObjectSchema as StaffingPlacementCreateManyInputObjectSchema } from './objects/StaffingPlacementCreateManyInput.schema';

export const StaffingPlacementCreateManySchema: z.ZodType<Prisma.StaffingPlacementCreateManyArgs> = z.object({ data: z.union([ StaffingPlacementCreateManyInputObjectSchema, z.array(StaffingPlacementCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.StaffingPlacementCreateManyArgs>;

export const StaffingPlacementCreateManyZodSchema = z.object({ data: z.union([ StaffingPlacementCreateManyInputObjectSchema, z.array(StaffingPlacementCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();