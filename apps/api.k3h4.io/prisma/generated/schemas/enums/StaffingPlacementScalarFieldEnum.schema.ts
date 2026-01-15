import * as z from 'zod';

export const StaffingPlacementScalarFieldEnumSchema = z.enum(['id', 'userId', 'engagementId', 'roleId', 'candidateId', 'personaId', 'startDate', 'endDate', 'status', 'billRate', 'payRate', 'margin', 'note', 'createdAt', 'updatedAt'])

export type StaffingPlacementScalarFieldEnum = z.infer<typeof StaffingPlacementScalarFieldEnumSchema>;