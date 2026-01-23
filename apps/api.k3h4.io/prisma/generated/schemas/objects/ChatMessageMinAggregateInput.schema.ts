import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  sessionId: z.literal(true).optional(),
  role: z.literal(true).optional(),
  content: z.literal(true).optional(),
  createdAt: z.literal(true).optional()
}).strict();
export const ChatMessageMinAggregateInputObjectSchema: z.ZodType<Prisma.ChatMessageMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ChatMessageMinAggregateInputType>;
export const ChatMessageMinAggregateInputObjectZodSchema = makeSchema();
