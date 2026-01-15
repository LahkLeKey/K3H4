import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  engagementId: z.literal(true).optional(),
  roleId: z.literal(true).optional(),
  candidateId: z.literal(true).optional(),
  personaId: z.literal(true).optional(),
  startDate: z.literal(true).optional(),
  endDate: z.literal(true).optional(),
  status: z.literal(true).optional(),
  billRate: z.literal(true).optional(),
  payRate: z.literal(true).optional(),
  margin: z.literal(true).optional(),
  note: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const StaffingPlacementMaxAggregateInputObjectSchema: z.ZodType<Prisma.StaffingPlacementMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementMaxAggregateInputType>;
export const StaffingPlacementMaxAggregateInputObjectZodSchema = makeSchema();
