import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  dataset: SortOrderSchema.optional(),
  endpoint: SortOrderSchema.optional(),
  params: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  paramsHash: SortOrderSchema.optional(),
  payload: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  fetchedAt: SortOrderSchema.optional(),
  expiresAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const UsdaCacheEntryOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.UsdaCacheEntryOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.UsdaCacheEntryOrderByWithRelationInput>;
export const UsdaCacheEntryOrderByWithRelationInputObjectZodSchema = makeSchema();
