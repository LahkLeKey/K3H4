import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureCropPlanSelectObjectSchema as AgricultureCropPlanSelectObjectSchema } from './objects/AgricultureCropPlanSelect.schema';
import { AgricultureCropPlanUpdateManyMutationInputObjectSchema as AgricultureCropPlanUpdateManyMutationInputObjectSchema } from './objects/AgricultureCropPlanUpdateManyMutationInput.schema';
import { AgricultureCropPlanWhereInputObjectSchema as AgricultureCropPlanWhereInputObjectSchema } from './objects/AgricultureCropPlanWhereInput.schema';

export const AgricultureCropPlanUpdateManyAndReturnSchema: z.ZodType<Prisma.AgricultureCropPlanUpdateManyAndReturnArgs> = z.object({ select: AgricultureCropPlanSelectObjectSchema.optional(), data: AgricultureCropPlanUpdateManyMutationInputObjectSchema, where: AgricultureCropPlanWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureCropPlanUpdateManyAndReturnArgs>;

export const AgricultureCropPlanUpdateManyAndReturnZodSchema = z.object({ select: AgricultureCropPlanSelectObjectSchema.optional(), data: AgricultureCropPlanUpdateManyMutationInputObjectSchema, where: AgricultureCropPlanWhereInputObjectSchema.optional() }).strict();