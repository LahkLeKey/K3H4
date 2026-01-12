import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  dataset: SortOrderSchema.optional(),
  scope: SortOrderSchema.optional(),
  releasedOn: SortOrderSchema.optional(),
  note: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  fetchedAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const UsdaReleaseOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.UsdaReleaseOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.UsdaReleaseOrderByWithRelationInput>;
export const UsdaReleaseOrderByWithRelationInputObjectZodSchema = makeSchema();
