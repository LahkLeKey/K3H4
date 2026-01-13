import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotConditionCreateManyPlotInputObjectSchema as AgriculturePlotConditionCreateManyPlotInputObjectSchema } from './AgriculturePlotConditionCreateManyPlotInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => AgriculturePlotConditionCreateManyPlotInputObjectSchema), z.lazy(() => AgriculturePlotConditionCreateManyPlotInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const AgriculturePlotConditionCreateManyPlotInputEnvelopeObjectSchema: z.ZodType<Prisma.AgriculturePlotConditionCreateManyPlotInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotConditionCreateManyPlotInputEnvelope>;
export const AgriculturePlotConditionCreateManyPlotInputEnvelopeObjectZodSchema = makeSchema();
