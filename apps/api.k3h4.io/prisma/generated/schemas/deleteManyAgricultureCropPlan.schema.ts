import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureCropPlanWhereInputObjectSchema as AgricultureCropPlanWhereInputObjectSchema } from './objects/AgricultureCropPlanWhereInput.schema';

export const AgricultureCropPlanDeleteManySchema: z.ZodType<Prisma.AgricultureCropPlanDeleteManyArgs> = z.object({ where: AgricultureCropPlanWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureCropPlanDeleteManyArgs>;

export const AgricultureCropPlanDeleteManyZodSchema = z.object({ where: AgricultureCropPlanWhereInputObjectSchema.optional() }).strict();