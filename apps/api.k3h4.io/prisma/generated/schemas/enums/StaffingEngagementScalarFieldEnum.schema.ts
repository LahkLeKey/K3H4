import * as z from 'zod';

export const StaffingEngagementScalarFieldEnumSchema = z.enum(['id', 'userId', 'name', 'client', 'priority', 'status', 'startDate', 'endDate', 'budget', 'forecast', 'notes', 'createdAt', 'updatedAt'])

export type StaffingEngagementScalarFieldEnum = z.infer<typeof StaffingEngagementScalarFieldEnumSchema>;