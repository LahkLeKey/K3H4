import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const ArcadeMachineOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.ArcadeMachineOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeMachineOrderByRelationAggregateInput>;
export const ArcadeMachineOrderByRelationAggregateInputObjectZodSchema = makeSchema();
