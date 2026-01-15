import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  engagementId: z.literal(true).optional(),
  title: z.literal(true).optional(),
  location: z.literal(true).optional(),
  modality: z.literal(true).optional(),
  openings: z.literal(true).optional(),
  filled: z.literal(true).optional(),
  priority: z.literal(true).optional(),
  status: z.literal(true).optional(),
  rateMin: z.literal(true).optional(),
  rateMax: z.literal(true).optional(),
  billRate: z.literal(true).optional(),
  payRate: z.literal(true).optional(),
  tags: z.literal(true).optional(),
  skills: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const StaffingRoleCountAggregateInputObjectSchema: z.ZodType<Prisma.StaffingRoleCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleCountAggregateInputType>;
export const StaffingRoleCountAggregateInputObjectZodSchema = makeSchema();
