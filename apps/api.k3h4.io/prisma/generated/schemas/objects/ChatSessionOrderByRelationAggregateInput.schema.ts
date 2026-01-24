import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const ChatSessionOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.ChatSessionOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatSessionOrderByRelationAggregateInput>;
export const ChatSessionOrderByRelationAggregateInputObjectZodSchema = makeSchema();
