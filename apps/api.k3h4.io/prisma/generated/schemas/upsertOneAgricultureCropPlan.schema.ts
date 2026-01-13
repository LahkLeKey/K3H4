import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureCropPlanSelectObjectSchema as AgricultureCropPlanSelectObjectSchema } from './objects/AgricultureCropPlanSelect.schema';
import { AgricultureCropPlanIncludeObjectSchema as AgricultureCropPlanIncludeObjectSchema } from './objects/AgricultureCropPlanInclude.schema';
import { AgricultureCropPlanWhereUniqueInputObjectSchema as AgricultureCropPlanWhereUniqueInputObjectSchema } from './objects/AgricultureCropPlanWhereUniqueInput.schema';
import { AgricultureCropPlanCreateInputObjectSchema as AgricultureCropPlanCreateInputObjectSchema } from './objects/AgricultureCropPlanCreateInput.schema';
import { AgricultureCropPlanUncheckedCreateInputObjectSchema as AgricultureCropPlanUncheckedCreateInputObjectSchema } from './objects/AgricultureCropPlanUncheckedCreateInput.schema';
import { AgricultureCropPlanUpdateInputObjectSchema as AgricultureCropPlanUpdateInputObjectSchema } from './objects/AgricultureCropPlanUpdateInput.schema';
import { AgricultureCropPlanUncheckedUpdateInputObjectSchema as AgricultureCropPlanUncheckedUpdateInputObjectSchema } from './objects/AgricultureCropPlanUncheckedUpdateInput.schema';

export const AgricultureCropPlanUpsertOneSchema: z.ZodType<Prisma.AgricultureCropPlanUpsertArgs> = z.object({ select: AgricultureCropPlanSelectObjectSchema.optional(), include: AgricultureCropPlanIncludeObjectSchema.optional(), where: AgricultureCropPlanWhereUniqueInputObjectSchema, create: z.union([ AgricultureCropPlanCreateInputObjectSchema, AgricultureCropPlanUncheckedCreateInputObjectSchema ]), update: z.union([ AgricultureCropPlanUpdateInputObjectSchema, AgricultureCropPlanUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.AgricultureCropPlanUpsertArgs>;

export const AgricultureCropPlanUpsertOneZodSchema = z.object({ select: AgricultureCropPlanSelectObjectSchema.optional(), include: AgricultureCropPlanIncludeObjectSchema.optional(), where: AgricultureCropPlanWhereUniqueInputObjectSchema, create: z.union([ AgricultureCropPlanCreateInputObjectSchema, AgricultureCropPlanUncheckedCreateInputObjectSchema ]), update: z.union([ AgricultureCropPlanUpdateInputObjectSchema, AgricultureCropPlanUncheckedUpdateInputObjectSchema ]) }).strict();