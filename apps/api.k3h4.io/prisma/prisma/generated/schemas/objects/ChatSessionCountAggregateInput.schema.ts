import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  title: z.literal(true).optional(),
  systemPrompt: z.literal(true).optional(),
  model: z.literal(true).optional(),
  temperature: z.literal(true).optional(),
  metadata: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const ChatSessionCountAggregateInputObjectSchema: z.ZodType<Prisma.ChatSessionCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ChatSessionCountAggregateInputType>;
export const ChatSessionCountAggregateInputObjectZodSchema = makeSchema();
