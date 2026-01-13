import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotConditionCreateManyUserInputObjectSchema as AgriculturePlotConditionCreateManyUserInputObjectSchema } from './AgriculturePlotConditionCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => AgriculturePlotConditionCreateManyUserInputObjectSchema), z.lazy(() => AgriculturePlotConditionCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const AgriculturePlotConditionCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.AgriculturePlotConditionCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotConditionCreateManyUserInputEnvelope>;
export const AgriculturePlotConditionCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
