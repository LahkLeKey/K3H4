import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureCropPlanWhereInputObjectSchema as AgricultureCropPlanWhereInputObjectSchema } from './AgricultureCropPlanWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => AgricultureCropPlanWhereInputObjectSchema).optional(),
  some: z.lazy(() => AgricultureCropPlanWhereInputObjectSchema).optional(),
  none: z.lazy(() => AgricultureCropPlanWhereInputObjectSchema).optional()
}).strict();
export const AgricultureCropPlanListRelationFilterObjectSchema: z.ZodType<Prisma.AgricultureCropPlanListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureCropPlanListRelationFilter>;
export const AgricultureCropPlanListRelationFilterObjectZodSchema = makeSchema();
