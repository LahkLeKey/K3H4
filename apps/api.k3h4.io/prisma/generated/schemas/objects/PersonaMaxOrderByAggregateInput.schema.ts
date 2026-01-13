import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  alias: SortOrderSchema.optional(),
  account: SortOrderSchema.optional(),
  handle: SortOrderSchema.optional(),
  note: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const PersonaMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PersonaMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaMaxOrderByAggregateInput>;
export const PersonaMaxOrderByAggregateInputObjectZodSchema = makeSchema();
