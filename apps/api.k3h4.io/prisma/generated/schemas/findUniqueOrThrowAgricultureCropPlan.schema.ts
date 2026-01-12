import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureCropPlanSelectObjectSchema as AgricultureCropPlanSelectObjectSchema } from './objects/AgricultureCropPlanSelect.schema';
import { AgricultureCropPlanIncludeObjectSchema as AgricultureCropPlanIncludeObjectSchema } from './objects/AgricultureCropPlanInclude.schema';
import { AgricultureCropPlanWhereUniqueInputObjectSchema as AgricultureCropPlanWhereUniqueInputObjectSchema } from './objects/AgricultureCropPlanWhereUniqueInput.schema';

export const AgricultureCropPlanFindUniqueOrThrowSchema: z.ZodType<Prisma.AgricultureCropPlanFindUniqueOrThrowArgs> = z.object({ select: AgricultureCropPlanSelectObjectSchema.optional(), include: AgricultureCropPlanIncludeObjectSchema.optional(), where: AgricultureCropPlanWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AgricultureCropPlanFindUniqueOrThrowArgs>;

export const AgricultureCropPlanFindUniqueOrThrowZodSchema = z.object({ select: AgricultureCropPlanSelectObjectSchema.optional(), include: AgricultureCropPlanIncludeObjectSchema.optional(), where: AgricultureCropPlanWhereUniqueInputObjectSchema }).strict();