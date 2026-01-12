import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureCropPlanWhereInputObjectSchema as AgricultureCropPlanWhereInputObjectSchema } from './AgricultureCropPlanWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => AgricultureCropPlanWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => AgricultureCropPlanWhereInputObjectSchema).optional().nullable()
}).strict();
export const AgricultureCropPlanNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.AgricultureCropPlanNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureCropPlanNullableScalarRelationFilter>;
export const AgricultureCropPlanNullableScalarRelationFilterObjectZodSchema = makeSchema();
