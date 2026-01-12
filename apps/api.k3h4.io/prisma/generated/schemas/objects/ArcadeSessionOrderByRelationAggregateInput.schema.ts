import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const ArcadeSessionOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.ArcadeSessionOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionOrderByRelationAggregateInput>;
export const ArcadeSessionOrderByRelationAggregateInputObjectZodSchema = makeSchema();
