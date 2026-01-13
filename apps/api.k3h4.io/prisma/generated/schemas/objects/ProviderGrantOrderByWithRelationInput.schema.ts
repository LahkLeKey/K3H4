import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  provider: SortOrderSchema.optional(),
  providerId: SortOrderSchema.optional(),
  accessToken: SortOrderSchema.optional(),
  scope: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  expiresAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const ProviderGrantOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ProviderGrantOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.ProviderGrantOrderByWithRelationInput>;
export const ProviderGrantOrderByWithRelationInputObjectZodSchema = makeSchema();
