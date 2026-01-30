import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OllamaOperationCreateManySessionInputObjectSchema as OllamaOperationCreateManySessionInputObjectSchema } from './OllamaOperationCreateManySessionInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => OllamaOperationCreateManySessionInputObjectSchema), z.lazy(() => OllamaOperationCreateManySessionInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const OllamaOperationCreateManySessionInputEnvelopeObjectSchema: z.ZodType<Prisma.OllamaOperationCreateManySessionInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.OllamaOperationCreateManySessionInputEnvelope>;
export const OllamaOperationCreateManySessionInputEnvelopeObjectZodSchema = makeSchema();
