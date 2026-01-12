import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  dataset: SortOrderSchema.optional(),
  code: SortOrderSchema.optional(),
  name: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  extra: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const UsdaUnitOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.UsdaUnitOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.UsdaUnitOrderByWithRelationInput>;
export const UsdaUnitOrderByWithRelationInputObjectZodSchema = makeSchema();
