import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureCropPlanSelectObjectSchema as AgricultureCropPlanSelectObjectSchema } from './objects/AgricultureCropPlanSelect.schema';
import { AgricultureCropPlanCreateManyInputObjectSchema as AgricultureCropPlanCreateManyInputObjectSchema } from './objects/AgricultureCropPlanCreateManyInput.schema';

export const AgricultureCropPlanCreateManyAndReturnSchema: z.ZodType<Prisma.AgricultureCropPlanCreateManyAndReturnArgs> = z.object({ select: AgricultureCropPlanSelectObjectSchema.optional(), data: z.union([ AgricultureCropPlanCreateManyInputObjectSchema, z.array(AgricultureCropPlanCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureCropPlanCreateManyAndReturnArgs>;

export const AgricultureCropPlanCreateManyAndReturnZodSchema = z.object({ select: AgricultureCropPlanSelectObjectSchema.optional(), data: z.union([ AgricultureCropPlanCreateManyInputObjectSchema, z.array(AgricultureCropPlanCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();