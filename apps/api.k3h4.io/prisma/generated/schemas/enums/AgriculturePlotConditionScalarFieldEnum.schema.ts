import * as z from 'zod';

export const AgriculturePlotConditionScalarFieldEnumSchema = z.enum(['id', 'userId', 'plotId', 'recordedAt', 'temperature', 'moisture', 'ph', 'notes', 'createdAt', 'updatedAt'])

export type AgriculturePlotConditionScalarFieldEnum = z.infer<typeof AgriculturePlotConditionScalarFieldEnumSchema>;