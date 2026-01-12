import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const ArcadePrizeOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.ArcadePrizeOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadePrizeOrderByRelationAggregateInput>;
export const ArcadePrizeOrderByRelationAggregateInputObjectZodSchema = makeSchema();
