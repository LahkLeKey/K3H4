import * as z from 'zod';

export const EngagementPrioritySchema = z.enum(['LOW', 'NORMAL', 'MEDIUM', 'HIGH', 'URGENT'])

export type EngagementPriority = z.infer<typeof EngagementPrioritySchema>;