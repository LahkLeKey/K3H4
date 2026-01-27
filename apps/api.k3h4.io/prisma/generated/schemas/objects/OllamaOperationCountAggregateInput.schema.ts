import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  source: z.literal(true).optional(),
  sessionId: z.literal(true).optional(),
  model: z.literal(true).optional(),
  temperature: z.literal(true).optional(),
  systemPrompt: z.literal(true).optional(),
  requestBody: z.literal(true).optional(),
  responseBody: z.literal(true).optional(),
  statusCode: z.literal(true).optional(),
  errorMessage: z.literal(true).optional(),
  metadata: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const OllamaOperationCountAggregateInputObjectSchema: z.ZodType<Prisma.OllamaOperationCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.OllamaOperationCountAggregateInputType>;
export const OllamaOperationCountAggregateInputObjectZodSchema = makeSchema();
