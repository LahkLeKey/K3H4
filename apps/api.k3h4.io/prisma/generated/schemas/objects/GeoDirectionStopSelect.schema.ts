import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionArgsObjectSchema as GeoDirectionArgsObjectSchema } from './GeoDirectionArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  directionId: z.boolean().optional(),
  direction: z.union([z.boolean(), z.lazy(() => GeoDirectionArgsObjectSchema)]).optional(),
  sequence: z.boolean().optional(),
  latitude: z.boolean().optional(),
  longitude: z.boolean().optional(),
  label: z.boolean().optional(),
  address: z.boolean().optional(),
  source: z.boolean().optional(),
  osmId: z.boolean().optional(),
  metadata: z.boolean().optional(),
  createdAt: z.boolean().optional()
}).strict();
export const GeoDirectionStopSelectObjectSchema: z.ZodType<Prisma.GeoDirectionStopSelect> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionStopSelect>;
export const GeoDirectionStopSelectObjectZodSchema = makeSchema();
