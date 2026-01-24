import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  temperature: z.literal(true).optional()
}).strict();
export const ChatSessionSumAggregateInputObjectSchema: z.ZodType<Prisma.ChatSessionSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ChatSessionSumAggregateInputType>;
export const ChatSessionSumAggregateInputObjectZodSchema = makeSchema();
