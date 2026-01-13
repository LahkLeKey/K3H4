import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotCreateManyUserInputObjectSchema as AgriculturePlotCreateManyUserInputObjectSchema } from './AgriculturePlotCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => AgriculturePlotCreateManyUserInputObjectSchema), z.lazy(() => AgriculturePlotCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const AgriculturePlotCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.AgriculturePlotCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotCreateManyUserInputEnvelope>;
export const AgriculturePlotCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
