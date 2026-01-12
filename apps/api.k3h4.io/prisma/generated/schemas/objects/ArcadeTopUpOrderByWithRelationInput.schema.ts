import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { ArcadeCardOrderByWithRelationInputObjectSchema as ArcadeCardOrderByWithRelationInputObjectSchema } from './ArcadeCardOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  cardId: SortOrderSchema.optional(),
  amount: SortOrderSchema.optional(),
  source: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  card: z.lazy(() => ArcadeCardOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const ArcadeTopUpOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ArcadeTopUpOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeTopUpOrderByWithRelationInput>;
export const ArcadeTopUpOrderByWithRelationInputObjectZodSchema = makeSchema();
