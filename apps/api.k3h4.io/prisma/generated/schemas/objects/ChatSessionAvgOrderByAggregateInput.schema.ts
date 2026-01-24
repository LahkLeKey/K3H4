import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  temperature: SortOrderSchema.optional()
}).strict();
export const ChatSessionAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ChatSessionAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatSessionAvgOrderByAggregateInput>;
export const ChatSessionAvgOrderByAggregateInputObjectZodSchema = makeSchema();
