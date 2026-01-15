import * as z from 'zod';

export const StaffingCandidateScalarFieldEnumSchema = z.enum(['id', 'userId', 'engagementId', 'roleId', 'personaId', 'fullName', 'email', 'phone', 'source', 'stage', 'score', 'desiredRate', 'availability', 'location', 'note', 'tags', 'createdAt', 'updatedAt'])

export type StaffingCandidateScalarFieldEnum = z.infer<typeof StaffingCandidateScalarFieldEnumSchema>;