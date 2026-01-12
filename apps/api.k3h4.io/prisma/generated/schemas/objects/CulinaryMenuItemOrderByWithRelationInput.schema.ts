import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  prepMinutes: SortOrderSchema.optional(),
  cost: SortOrderSchema.optional(),
  price: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const CulinaryMenuItemOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.CulinaryMenuItemOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryMenuItemOrderByWithRelationInput>;
export const CulinaryMenuItemOrderByWithRelationInputObjectZodSchema = makeSchema();
