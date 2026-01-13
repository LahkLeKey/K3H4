import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { PersonaOrderByWithRelationInputObjectSchema as PersonaOrderByWithRelationInputObjectSchema } from './PersonaOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  sourceId: SortOrderSchema.optional(),
  targetId: SortOrderSchema.optional(),
  jaccardScore: SortOrderSchema.optional(),
  intersectionCount: SortOrderSchema.optional(),
  unionCount: SortOrderSchema.optional(),
  overlappingTokens: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  computedAt: SortOrderSchema.optional(),
  rationale: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  status: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  source: z.lazy(() => PersonaOrderByWithRelationInputObjectSchema).optional(),
  target: z.lazy(() => PersonaOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const PersonaCompatibilityOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.PersonaCompatibilityOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCompatibilityOrderByWithRelationInput>;
export const PersonaCompatibilityOrderByWithRelationInputObjectZodSchema = makeSchema();
