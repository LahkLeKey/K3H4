import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  temperature: z.literal(true).optional(),
  statusCode: z.literal(true).optional()
}).strict();
export const OllamaOperationSumAggregateInputObjectSchema: z.ZodType<Prisma.OllamaOperationSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.OllamaOperationSumAggregateInputType>;
export const OllamaOperationSumAggregateInputObjectZodSchema = makeSchema();
