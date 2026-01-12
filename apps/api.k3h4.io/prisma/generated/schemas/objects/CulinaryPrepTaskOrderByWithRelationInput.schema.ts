import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  task: SortOrderSchema.optional(),
  station: SortOrderSchema.optional(),
  dueAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const CulinaryPrepTaskOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.CulinaryPrepTaskOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryPrepTaskOrderByWithRelationInput>;
export const CulinaryPrepTaskOrderByWithRelationInputObjectZodSchema = makeSchema();
