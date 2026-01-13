import * as z from 'zod';

export const AgricultureTaskScalarFieldEnumSchema = z.enum(['id', 'userId', 'plotId', 'cropPlanId', 'title', 'assignee', 'priority', 'tags', 'notes', 'dueDate', 'status', 'createdAt', 'updatedAt'])

export type AgricultureTaskScalarFieldEnum = z.infer<typeof AgricultureTaskScalarFieldEnumSchema>;