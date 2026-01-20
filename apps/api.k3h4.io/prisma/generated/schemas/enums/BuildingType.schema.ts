import * as z from 'zod';

export const BuildingTypeSchema = z.enum(['RESIDENTIAL', 'COMMERCIAL', 'INDUSTRIAL'])

export type BuildingType = z.infer<typeof BuildingTypeSchema>;