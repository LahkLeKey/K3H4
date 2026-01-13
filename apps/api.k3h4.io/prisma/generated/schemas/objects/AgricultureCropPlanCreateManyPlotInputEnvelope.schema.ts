import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureCropPlanCreateManyPlotInputObjectSchema as AgricultureCropPlanCreateManyPlotInputObjectSchema } from './AgricultureCropPlanCreateManyPlotInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => AgricultureCropPlanCreateManyPlotInputObjectSchema), z.lazy(() => AgricultureCropPlanCreateManyPlotInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const AgricultureCropPlanCreateManyPlotInputEnvelopeObjectSchema: z.ZodType<Prisma.AgricultureCropPlanCreateManyPlotInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureCropPlanCreateManyPlotInputEnvelope>;
export const AgricultureCropPlanCreateManyPlotInputEnvelopeObjectZodSchema = makeSchema();
