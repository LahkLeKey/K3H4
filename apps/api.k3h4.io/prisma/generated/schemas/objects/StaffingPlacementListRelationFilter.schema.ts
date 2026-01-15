import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingPlacementWhereInputObjectSchema as StaffingPlacementWhereInputObjectSchema } from './StaffingPlacementWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => StaffingPlacementWhereInputObjectSchema).optional(),
  some: z.lazy(() => StaffingPlacementWhereInputObjectSchema).optional(),
  none: z.lazy(() => StaffingPlacementWhereInputObjectSchema).optional()
}).strict();
export const StaffingPlacementListRelationFilterObjectSchema: z.ZodType<Prisma.StaffingPlacementListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementListRelationFilter>;
export const StaffingPlacementListRelationFilterObjectZodSchema = makeSchema();
