import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AiInsightCreateManyUserInputObjectSchema as AiInsightCreateManyUserInputObjectSchema } from './AiInsightCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => AiInsightCreateManyUserInputObjectSchema), z.lazy(() => AiInsightCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const AiInsightCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.AiInsightCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.AiInsightCreateManyUserInputEnvelope>;
export const AiInsightCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
