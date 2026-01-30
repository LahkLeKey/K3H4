import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { EntityOrderByWithRelationInputObjectSchema as EntityOrderByWithRelationInputObjectSchema } from './EntityOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  entityId: SortOrderSchema.optional(),
  key: SortOrderSchema.optional(),
  payload: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  expiresAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  entity: z.lazy(() => EntityOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const EntityCacheOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.EntityCacheOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.EntityCacheOrderByWithRelationInput>;
export const EntityCacheOrderByWithRelationInputObjectZodSchema = makeSchema();
