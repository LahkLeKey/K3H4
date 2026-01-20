import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  osmId: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  addressHouseNumber: SortOrderSchema.optional(),
  addressStreet: SortOrderSchema.optional(),
  addressCity: SortOrderSchema.optional(),
  addressPostcode: SortOrderSchema.optional(),
  addressState: SortOrderSchema.optional(),
  addressCountry: SortOrderSchema.optional()
}).strict();
export const BuildingMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.BuildingMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.BuildingMinOrderByAggregateInput>;
export const BuildingMinOrderByAggregateInputObjectZodSchema = makeSchema();
