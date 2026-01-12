import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureCropPlanSelectObjectSchema as AgricultureCropPlanSelectObjectSchema } from './objects/AgricultureCropPlanSelect.schema';
import { AgricultureCropPlanIncludeObjectSchema as AgricultureCropPlanIncludeObjectSchema } from './objects/AgricultureCropPlanInclude.schema';
import { AgricultureCropPlanCreateInputObjectSchema as AgricultureCropPlanCreateInputObjectSchema } from './objects/AgricultureCropPlanCreateInput.schema';
import { AgricultureCropPlanUncheckedCreateInputObjectSchema as AgricultureCropPlanUncheckedCreateInputObjectSchema } from './objects/AgricultureCropPlanUncheckedCreateInput.schema';

export const AgricultureCropPlanCreateOneSchema: z.ZodType<Prisma.AgricultureCropPlanCreateArgs> = z.object({ select: AgricultureCropPlanSelectObjectSchema.optional(), include: AgricultureCropPlanIncludeObjectSchema.optional(), data: z.union([AgricultureCropPlanCreateInputObjectSchema, AgricultureCropPlanUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.AgricultureCropPlanCreateArgs>;

export const AgricultureCropPlanCreateOneZodSchema = z.object({ select: AgricultureCropPlanSelectObjectSchema.optional(), include: AgricultureCropPlanIncludeObjectSchema.optional(), data: z.union([AgricultureCropPlanCreateInputObjectSchema, AgricultureCropPlanUncheckedCreateInputObjectSchema]) }).strict();