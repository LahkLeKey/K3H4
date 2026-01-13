import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureCropPlanSelectObjectSchema as AgricultureCropPlanSelectObjectSchema } from './objects/AgricultureCropPlanSelect.schema';
import { AgricultureCropPlanIncludeObjectSchema as AgricultureCropPlanIncludeObjectSchema } from './objects/AgricultureCropPlanInclude.schema';
import { AgricultureCropPlanWhereUniqueInputObjectSchema as AgricultureCropPlanWhereUniqueInputObjectSchema } from './objects/AgricultureCropPlanWhereUniqueInput.schema';

export const AgricultureCropPlanDeleteOneSchema: z.ZodType<Prisma.AgricultureCropPlanDeleteArgs> = z.object({ select: AgricultureCropPlanSelectObjectSchema.optional(), include: AgricultureCropPlanIncludeObjectSchema.optional(), where: AgricultureCropPlanWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AgricultureCropPlanDeleteArgs>;

export const AgricultureCropPlanDeleteOneZodSchema = z.object({ select: AgricultureCropPlanSelectObjectSchema.optional(), include: AgricultureCropPlanIncludeObjectSchema.optional(), where: AgricultureCropPlanWhereUniqueInputObjectSchema }).strict();