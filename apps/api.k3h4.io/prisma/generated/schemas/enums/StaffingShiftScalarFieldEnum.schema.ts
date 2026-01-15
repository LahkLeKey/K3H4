import * as z from 'zod';

export const StaffingShiftScalarFieldEnumSchema = z.enum(['id', 'userId', 'roleId', 'title', 'location', 'startsAt', 'endsAt', 'status', 'coverageStatus', 'assignedPersonaId', 'assignedCandidateId', 'notes', 'createdAt', 'updatedAt'])

export type StaffingShiftScalarFieldEnum = z.infer<typeof StaffingShiftScalarFieldEnumSchema>;