import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  temperature: SortOrderSchema.optional()
}).strict();
export const ChatSessionSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ChatSessionSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatSessionSumOrderByAggregateInput>;
export const ChatSessionSumOrderByAggregateInputObjectZodSchema = makeSchema();
