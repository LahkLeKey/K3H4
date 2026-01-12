import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  personaId: SortOrderSchema.optional(),
  category: SortOrderSchema.optional(),
  value: SortOrderSchema.optional(),
  weight: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const PersonaAttributeCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PersonaAttributeCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaAttributeCountOrderByAggregateInput>;
export const PersonaAttributeCountOrderByAggregateInputObjectZodSchema = makeSchema();
