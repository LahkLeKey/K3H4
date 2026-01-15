import * as z from 'zod';

export const StaffingRoleScalarFieldEnumSchema = z.enum(['id', 'userId', 'engagementId', 'title', 'location', 'modality', 'openings', 'filled', 'priority', 'status', 'rateMin', 'rateMax', 'billRate', 'payRate', 'tags', 'skills', 'createdAt', 'updatedAt'])

export type StaffingRoleScalarFieldEnum = z.infer<typeof StaffingRoleScalarFieldEnumSchema>;