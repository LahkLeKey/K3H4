import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const PosTicketOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.PosTicketOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PosTicketOrderByRelationAggregateInput>;
export const PosTicketOrderByRelationAggregateInputObjectZodSchema = makeSchema();
