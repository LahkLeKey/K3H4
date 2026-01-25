import * as z from 'zod';
export const StaffingEngagementUpdateResultSchema = z.nullable(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  name: z.string(),
  client: z.string().optional(),
  priority: z.unknown(),
  status: z.unknown(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  budget: z.number().optional(),
  forecast: z.number().optional(),
  notes: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  roles: z.array(z.unknown()),
  candidates: z.array(z.unknown()),
  placements: z.array(z.unknown())
}));