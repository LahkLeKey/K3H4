import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingEngagementWhereInputObjectSchema as StaffingEngagementWhereInputObjectSchema } from './StaffingEngagementWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => StaffingEngagementWhereInputObjectSchema).optional(),
  some: z.lazy(() => StaffingEngagementWhereInputObjectSchema).optional(),
  none: z.lazy(() => StaffingEngagementWhereInputObjectSchema).optional()
}).strict();
export const StaffingEngagementListRelationFilterObjectSchema: z.ZodType<Prisma.StaffingEngagementListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.StaffingEngagementListRelationFilter>;
export const StaffingEngagementListRelationFilterObjectZodSchema = makeSchema();
