import * as z from 'zod';

export const WarehouseCategorySchema = z.enum(['AGRICULTURE', 'OTHER'])

export type WarehouseCategory = z.infer<typeof WarehouseCategorySchema>;