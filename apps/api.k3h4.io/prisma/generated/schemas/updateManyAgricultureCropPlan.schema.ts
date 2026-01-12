import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureCropPlanUpdateManyMutationInputObjectSchema as AgricultureCropPlanUpdateManyMutationInputObjectSchema } from './objects/AgricultureCropPlanUpdateManyMutationInput.schema';
import { AgricultureCropPlanWhereInputObjectSchema as AgricultureCropPlanWhereInputObjectSchema } from './objects/AgricultureCropPlanWhereInput.schema';

export const AgricultureCropPlanUpdateManySchema: z.ZodType<Prisma.AgricultureCropPlanUpdateManyArgs> = z.object({ data: AgricultureCropPlanUpdateManyMutationInputObjectSchema, where: AgricultureCropPlanWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureCropPlanUpdateManyArgs>;

export const AgricultureCropPlanUpdateManyZodSchema = z.object({ data: AgricultureCropPlanUpdateManyMutationInputObjectSchema, where: AgricultureCropPlanWhereInputObjectSchema.optional() }).strict();