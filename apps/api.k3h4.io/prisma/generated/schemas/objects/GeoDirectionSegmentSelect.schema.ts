import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionArgsObjectSchema as GeoDirectionArgsObjectSchema } from './GeoDirectionArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  directionId: z.boolean().optional(),
  direction: z.union([z.boolean(), z.lazy(() => GeoDirectionArgsObjectSchema)]).optional(),
  sequence: z.boolean().optional(),
  instruction: z.boolean().optional(),
  maneuverType: z.boolean().optional(),
  maneuverModifier: z.boolean().optional(),
  distanceMeters: z.boolean().optional(),
  durationSeconds: z.boolean().optional(),
  startLat: z.boolean().optional(),
  startLng: z.boolean().optional(),
  endLat: z.boolean().optional(),
  endLng: z.boolean().optional(),
  geometry: z.boolean().optional(),
  metadata: z.boolean().optional(),
  createdAt: z.boolean().optional()
}).strict();
export const GeoDirectionSegmentSelectObjectSchema: z.ZodType<Prisma.GeoDirectionSegmentSelect> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionSegmentSelect>;
export const GeoDirectionSegmentSelectObjectZodSchema = makeSchema();
