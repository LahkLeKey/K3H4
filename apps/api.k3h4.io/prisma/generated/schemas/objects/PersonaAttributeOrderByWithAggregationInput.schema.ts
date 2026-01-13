import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { PersonaAttributeCountOrderByAggregateInputObjectSchema as PersonaAttributeCountOrderByAggregateInputObjectSchema } from './PersonaAttributeCountOrderByAggregateInput.schema';
import { PersonaAttributeAvgOrderByAggregateInputObjectSchema as PersonaAttributeAvgOrderByAggregateInputObjectSchema } from './PersonaAttributeAvgOrderByAggregateInput.schema';
import { PersonaAttributeMaxOrderByAggregateInputObjectSchema as PersonaAttributeMaxOrderByAggregateInputObjectSchema } from './PersonaAttributeMaxOrderByAggregateInput.schema';
import { PersonaAttributeMinOrderByAggregateInputObjectSchema as PersonaAttributeMinOrderByAggregateInputObjectSchema } from './PersonaAttributeMinOrderByAggregateInput.schema';
import { PersonaAttributeSumOrderByAggregateInputObjectSchema as PersonaAttributeSumOrderByAggregateInputObjectSchema } from './PersonaAttributeSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  personaId: SortOrderSchema.optional(),
  category: SortOrderSchema.optional(),
  value: SortOrderSchema.optional(),
  weight: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => PersonaAttributeCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => PersonaAttributeAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => PersonaAttributeMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => PersonaAttributeMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => PersonaAttributeSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const PersonaAttributeOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.PersonaAttributeOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaAttributeOrderByWithAggregationInput>;
export const PersonaAttributeOrderByWithAggregationInputObjectZodSchema = makeSchema();
