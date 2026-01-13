import * as z from 'zod';

export const AgriculturePlotScalarFieldEnumSchema = z.enum(['id', 'userId', 'name', 'fieldCode', 'crop', 'stage', 'acres', 'health', 'soilType', 'irrigationZone', 'notes', 'lastConditionAt', 'createdAt', 'updatedAt'])

export type AgriculturePlotScalarFieldEnum = z.infer<typeof AgriculturePlotScalarFieldEnumSchema>;