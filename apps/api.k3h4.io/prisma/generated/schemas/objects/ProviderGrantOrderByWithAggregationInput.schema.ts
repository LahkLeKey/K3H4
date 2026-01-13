import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ProviderGrantCountOrderByAggregateInputObjectSchema as ProviderGrantCountOrderByAggregateInputObjectSchema } from './ProviderGrantCountOrderByAggregateInput.schema';
import { ProviderGrantMaxOrderByAggregateInputObjectSchema as ProviderGrantMaxOrderByAggregateInputObjectSchema } from './ProviderGrantMaxOrderByAggregateInput.schema';
import { ProviderGrantMinOrderByAggregateInputObjectSchema as ProviderGrantMinOrderByAggregateInputObjectSchema } from './ProviderGrantMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  provider: SortOrderSchema.optional(),
  providerId: SortOrderSchema.optional(),
  accessToken: SortOrderSchema.optional(),
  scope: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  expiresAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  _count: z.lazy(() => ProviderGrantCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => ProviderGrantMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => ProviderGrantMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const ProviderGrantOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.ProviderGrantOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.ProviderGrantOrderByWithAggregationInput>;
export const ProviderGrantOrderByWithAggregationInputObjectZodSchema = makeSchema();
