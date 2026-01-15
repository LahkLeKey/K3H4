import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  engagementId: z.literal(true).optional(),
  roleId: z.literal(true).optional(),
  personaId: z.literal(true).optional(),
  fullName: z.literal(true).optional(),
  email: z.literal(true).optional(),
  phone: z.literal(true).optional(),
  source: z.literal(true).optional(),
  stage: z.literal(true).optional(),
  score: z.literal(true).optional(),
  desiredRate: z.literal(true).optional(),
  availability: z.literal(true).optional(),
  location: z.literal(true).optional(),
  note: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const StaffingCandidateMinAggregateInputObjectSchema: z.ZodType<Prisma.StaffingCandidateMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateMinAggregateInputType>;
export const StaffingCandidateMinAggregateInputObjectZodSchema = makeSchema();
