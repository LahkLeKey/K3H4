import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  provider: SortOrderSchema.optional(),
  providerId: SortOrderSchema.optional(),
  accessToken: SortOrderSchema.optional(),
  scope: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const ProviderGrantCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ProviderGrantCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProviderGrantCountOrderByAggregateInput>;
export const ProviderGrantCountOrderByAggregateInputObjectZodSchema = makeSchema();
