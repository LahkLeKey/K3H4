import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  token: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const RefreshTokenOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.RefreshTokenOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.RefreshTokenOrderByWithRelationInput>;
export const RefreshTokenOrderByWithRelationInputObjectZodSchema = makeSchema();
