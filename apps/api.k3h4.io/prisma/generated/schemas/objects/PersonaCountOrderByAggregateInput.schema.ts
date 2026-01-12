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
  tags: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const PersonaCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PersonaCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCountOrderByAggregateInput>;
export const PersonaCountOrderByAggregateInputObjectZodSchema = makeSchema();
