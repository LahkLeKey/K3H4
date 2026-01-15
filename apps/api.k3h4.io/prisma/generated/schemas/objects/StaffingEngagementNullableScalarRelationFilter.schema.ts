import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingEngagementWhereInputObjectSchema as StaffingEngagementWhereInputObjectSchema } from './StaffingEngagementWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => StaffingEngagementWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => StaffingEngagementWhereInputObjectSchema).optional().nullable()
}).strict();
export const StaffingEngagementNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.StaffingEngagementNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.StaffingEngagementNullableScalarRelationFilter>;
export const StaffingEngagementNullableScalarRelationFilterObjectZodSchema = makeSchema();
