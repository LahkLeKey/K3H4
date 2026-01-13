import * as z from 'zod';

export const AgricultureCropPlanScalarFieldEnumSchema = z.enum(['id', 'userId', 'plotId', 'crop', 'phase', 'status', 'startDate', 'targetHarvestDate', 'endDate', 'notes', 'createdAt', 'updatedAt'])

export type AgricultureCropPlanScalarFieldEnum = z.infer<typeof AgricultureCropPlanScalarFieldEnumSchema>;