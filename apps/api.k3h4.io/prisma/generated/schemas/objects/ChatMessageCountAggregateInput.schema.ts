import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  sessionId: z.literal(true).optional(),
  role: z.literal(true).optional(),
  content: z.literal(true).optional(),
  metadata: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const ChatMessageCountAggregateInputObjectSchema: z.ZodType<Prisma.ChatMessageCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ChatMessageCountAggregateInputType>;
export const ChatMessageCountAggregateInputObjectZodSchema = makeSchema();
