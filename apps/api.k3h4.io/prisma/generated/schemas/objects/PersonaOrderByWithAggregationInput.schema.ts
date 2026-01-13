import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { PersonaCountOrderByAggregateInputObjectSchema as PersonaCountOrderByAggregateInputObjectSchema } from './PersonaCountOrderByAggregateInput.schema';
import { PersonaMaxOrderByAggregateInputObjectSchema as PersonaMaxOrderByAggregateInputObjectSchema } from './PersonaMaxOrderByAggregateInput.schema';
import { PersonaMinOrderByAggregateInputObjectSchema as PersonaMinOrderByAggregateInputObjectSchema } from './PersonaMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  alias: SortOrderSchema.optional(),
  account: SortOrderSchema.optional(),
  handle: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  note: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  tags: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => PersonaCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => PersonaMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => PersonaMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const PersonaOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.PersonaOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaOrderByWithAggregationInput>;
export const PersonaOrderByWithAggregationInputObjectZodSchema = makeSchema();
