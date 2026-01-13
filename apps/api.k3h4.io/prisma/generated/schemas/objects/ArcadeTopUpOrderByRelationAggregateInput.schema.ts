import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const ArcadeTopUpOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.ArcadeTopUpOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeTopUpOrderByRelationAggregateInput>;
export const ArcadeTopUpOrderByRelationAggregateInputObjectZodSchema = makeSchema();
