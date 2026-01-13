import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { ArcadeSessionOrderByRelationAggregateInputObjectSchema as ArcadeSessionOrderByRelationAggregateInputObjectSchema } from './ArcadeSessionOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  gameTitle: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  location: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  sessions: z.lazy(() => ArcadeSessionOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const ArcadeMachineOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ArcadeMachineOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeMachineOrderByWithRelationInput>;
export const ArcadeMachineOrderByWithRelationInputObjectZodSchema = makeSchema();
