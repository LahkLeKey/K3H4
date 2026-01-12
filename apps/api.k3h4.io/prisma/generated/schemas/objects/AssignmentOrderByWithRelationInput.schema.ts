import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { PersonaOrderByWithRelationInputObjectSchema as PersonaOrderByWithRelationInputObjectSchema } from './PersonaOrderByWithRelationInput.schema';
import { AssignmentTimecardOrderByRelationAggregateInputObjectSchema as AssignmentTimecardOrderByRelationAggregateInputObjectSchema } from './AssignmentTimecardOrderByRelationAggregateInput.schema';
import { AssignmentPayoutOrderByRelationAggregateInputObjectSchema as AssignmentPayoutOrderByRelationAggregateInputObjectSchema } from './AssignmentPayoutOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  personaId: SortOrderSchema.optional(),
  title: SortOrderSchema.optional(),
  hourlyRate: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  persona: z.lazy(() => PersonaOrderByWithRelationInputObjectSchema).optional(),
  timecards: z.lazy(() => AssignmentTimecardOrderByRelationAggregateInputObjectSchema).optional(),
  payouts: z.lazy(() => AssignmentPayoutOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const AssignmentOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.AssignmentOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentOrderByWithRelationInput>;
export const AssignmentOrderByWithRelationInputObjectZodSchema = makeSchema();
