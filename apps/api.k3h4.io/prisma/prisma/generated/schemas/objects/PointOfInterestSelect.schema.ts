import * as z from 'zod';
import type { Prisma } from '@prisma/client';


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
  updatedAt: z.boolean().optional()
}).strict();
export const PointOfInterestSelectObjectSchema: z.ZodType<Prisma.PointOfInterestSelect> = makeSchema() as unknown as z.ZodType<Prisma.PointOfInterestSelect>;
export const PointOfInterestSelectObjectZodSchema = makeSchema();
