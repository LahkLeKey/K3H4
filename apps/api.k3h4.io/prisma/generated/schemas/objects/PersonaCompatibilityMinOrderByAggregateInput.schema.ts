import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  sourceId: SortOrderSchema.optional(),
  targetId: SortOrderSchema.optional(),
  jaccardScore: SortOrderSchema.optional(),
  intersectionCount: SortOrderSchema.optional(),
  unionCount: SortOrderSchema.optional(),
  computedAt: SortOrderSchema.optional(),
  rationale: SortOrderSchema.optional(),
  status: SortOrderSchema.optional()
}).strict();
export const PersonaCompatibilityMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PersonaCompatibilityMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCompatibilityMinOrderByAggregateInput>;
export const PersonaCompatibilityMinOrderByAggregateInputObjectZodSchema = makeSchema();
