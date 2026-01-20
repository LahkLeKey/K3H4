import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BuildingArgsObjectSchema as BuildingArgsObjectSchema } from './BuildingArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  osmType: z.boolean().optional(),
  osmId: z.boolean().optional(),
  name: z.boolean().optional(),
  category: z.boolean().optional(),
  latitude: z.boolean().optional(),
  longitude: z.boolean().optional(),
  tags: z.boolean().optional(),
  source: z.boolean().optional(),
  lastSeenAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  buildingId: z.boolean().optional(),
  building: z.union([z.boolean(), z.lazy(() => BuildingArgsObjectSchema)]).optional()
}).strict();
export const PoiSelectObjectSchema: z.ZodType<Prisma.PoiSelect> = makeSchema() as unknown as z.ZodType<Prisma.PoiSelect>;
export const PoiSelectObjectZodSchema = makeSchema();
