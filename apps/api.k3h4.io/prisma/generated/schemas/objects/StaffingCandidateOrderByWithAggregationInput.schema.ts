import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { StaffingCandidateCountOrderByAggregateInputObjectSchema as StaffingCandidateCountOrderByAggregateInputObjectSchema } from './StaffingCandidateCountOrderByAggregateInput.schema';
import { StaffingCandidateAvgOrderByAggregateInputObjectSchema as StaffingCandidateAvgOrderByAggregateInputObjectSchema } from './StaffingCandidateAvgOrderByAggregateInput.schema';
import { StaffingCandidateMaxOrderByAggregateInputObjectSchema as StaffingCandidateMaxOrderByAggregateInputObjectSchema } from './StaffingCandidateMaxOrderByAggregateInput.schema';
import { StaffingCandidateMinOrderByAggregateInputObjectSchema as StaffingCandidateMinOrderByAggregateInputObjectSchema } from './StaffingCandidateMinOrderByAggregateInput.schema';
import { StaffingCandidateSumOrderByAggregateInputObjectSchema as StaffingCandidateSumOrderByAggregateInputObjectSchema } from './StaffingCandidateSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  engagementId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  roleId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  personaId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  fullName: SortOrderSchema.optional(),
  email: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  phone: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  source: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  stage: SortOrderSchema.optional(),
  score: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  desiredRate: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  availability: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  location: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  note: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  tags: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => StaffingCandidateCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => StaffingCandidateAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => StaffingCandidateMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => StaffingCandidateMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => StaffingCandidateSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const StaffingCandidateOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.StaffingCandidateOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateOrderByWithAggregationInput>;
export const StaffingCandidateOrderByWithAggregationInputObjectZodSchema = makeSchema();
