import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  temperature: z.literal(true).optional(),
  statusCode: z.literal(true).optional()
}).strict();
export const OllamaOperationAvgAggregateInputObjectSchema: z.ZodType<Prisma.OllamaOperationAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.OllamaOperationAvgAggregateInputType>;
export const OllamaOperationAvgAggregateInputObjectZodSchema = makeSchema();
