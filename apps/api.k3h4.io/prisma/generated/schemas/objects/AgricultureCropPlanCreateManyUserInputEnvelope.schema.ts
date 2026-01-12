import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureCropPlanCreateManyUserInputObjectSchema as AgricultureCropPlanCreateManyUserInputObjectSchema } from './AgricultureCropPlanCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => AgricultureCropPlanCreateManyUserInputObjectSchema), z.lazy(() => AgricultureCropPlanCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const AgricultureCropPlanCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.AgricultureCropPlanCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureCropPlanCreateManyUserInputEnvelope>;
export const AgricultureCropPlanCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
