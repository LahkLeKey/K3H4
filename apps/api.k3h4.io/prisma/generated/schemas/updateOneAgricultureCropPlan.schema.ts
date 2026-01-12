import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureCropPlanSelectObjectSchema as AgricultureCropPlanSelectObjectSchema } from './objects/AgricultureCropPlanSelect.schema';
import { AgricultureCropPlanIncludeObjectSchema as AgricultureCropPlanIncludeObjectSchema } from './objects/AgricultureCropPlanInclude.schema';
import { AgricultureCropPlanUpdateInputObjectSchema as AgricultureCropPlanUpdateInputObjectSchema } from './objects/AgricultureCropPlanUpdateInput.schema';
import { AgricultureCropPlanUncheckedUpdateInputObjectSchema as AgricultureCropPlanUncheckedUpdateInputObjectSchema } from './objects/AgricultureCropPlanUncheckedUpdateInput.schema';
import { AgricultureCropPlanWhereUniqueInputObjectSchema as AgricultureCropPlanWhereUniqueInputObjectSchema } from './objects/AgricultureCropPlanWhereUniqueInput.schema';

export const AgricultureCropPlanUpdateOneSchema: z.ZodType<Prisma.AgricultureCropPlanUpdateArgs> = z.object({ select: AgricultureCropPlanSelectObjectSchema.optional(), include: AgricultureCropPlanIncludeObjectSchema.optional(), data: z.union([AgricultureCropPlanUpdateInputObjectSchema, AgricultureCropPlanUncheckedUpdateInputObjectSchema]), where: AgricultureCropPlanWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AgricultureCropPlanUpdateArgs>;

export const AgricultureCropPlanUpdateOneZodSchema = z.object({ select: AgricultureCropPlanSelectObjectSchema.optional(), include: AgricultureCropPlanIncludeObjectSchema.optional(), data: z.union([AgricultureCropPlanUpdateInputObjectSchema, AgricultureCropPlanUncheckedUpdateInputObjectSchema]), where: AgricultureCropPlanWhereUniqueInputObjectSchema }).strict();