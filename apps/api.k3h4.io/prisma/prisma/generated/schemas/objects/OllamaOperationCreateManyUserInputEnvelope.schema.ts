import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OllamaOperationCreateManyUserInputObjectSchema as OllamaOperationCreateManyUserInputObjectSchema } from './OllamaOperationCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => OllamaOperationCreateManyUserInputObjectSchema), z.lazy(() => OllamaOperationCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const OllamaOperationCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.OllamaOperationCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.OllamaOperationCreateManyUserInputEnvelope>;
export const OllamaOperationCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
