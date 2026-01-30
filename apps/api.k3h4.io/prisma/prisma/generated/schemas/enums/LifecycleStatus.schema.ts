import * as z from 'zod';

export const LifecycleStatusSchema = z.enum(['ACTIVE', 'INACTIVE', 'OPEN', 'CLOSED', 'PENDING', 'PLANNING', 'COMPLETED', 'STORED', 'IDLE', 'SCHEDULED', 'UNFILLED'])

export type LifecycleStatus = z.infer<typeof LifecycleStatusSchema>;