import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { AssignmentOrderByRelationAggregateInputObjectSchema as AssignmentOrderByRelationAggregateInputObjectSchema } from './AssignmentOrderByRelationAggregateInput.schema';
import { AssignmentPayoutOrderByRelationAggregateInputObjectSchema as AssignmentPayoutOrderByRelationAggregateInputObjectSchema } from './AssignmentPayoutOrderByRelationAggregateInput.schema';
import { PersonaAttributeOrderByRelationAggregateInputObjectSchema as PersonaAttributeOrderByRelationAggregateInputObjectSchema } from './PersonaAttributeOrderByRelationAggregateInput.schema';
import { PersonaCompatibilityOrderByRelationAggregateInputObjectSchema as PersonaCompatibilityOrderByRelationAggregateInputObjectSchema } from './PersonaCompatibilityOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  alias: SortOrderSchema.optional(),
  account: SortOrderSchema.optional(),
  handle: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  note: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  tags: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  assignments: z.lazy(() => AssignmentOrderByRelationAggregateInputObjectSchema).optional(),
  assignmentPayouts: z.lazy(() => AssignmentPayoutOrderByRelationAggregateInputObjectSchema).optional(),
  attributes: z.lazy(() => PersonaAttributeOrderByRelationAggregateInputObjectSchema).optional(),
  compatibilitySources: z.lazy(() => PersonaCompatibilityOrderByRelationAggregateInputObjectSchema).optional(),
  compatibilityTargets: z.lazy(() => PersonaCompatibilityOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const PersonaOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.PersonaOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaOrderByWithRelationInput>;
export const PersonaOrderByWithRelationInputObjectZodSchema = makeSchema();
