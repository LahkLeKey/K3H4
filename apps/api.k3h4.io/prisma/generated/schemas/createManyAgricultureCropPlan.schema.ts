import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureCropPlanCreateManyInputObjectSchema as AgricultureCropPlanCreateManyInputObjectSchema } from './objects/AgricultureCropPlanCreateManyInput.schema';

export const AgricultureCropPlanCreateManySchema: z.ZodType<Prisma.AgricultureCropPlanCreateManyArgs> = z.object({ data: z.union([ AgricultureCropPlanCreateManyInputObjectSchema, z.array(AgricultureCropPlanCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureCropPlanCreateManyArgs>;

export const AgricultureCropPlanCreateManyZodSchema = z.object({ data: z.union([ AgricultureCropPlanCreateManyInputObjectSchema, z.array(AgricultureCropPlanCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();