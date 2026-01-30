import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  title: z.boolean().optional(),
  originName: z.boolean().optional(),
  originLat: z.boolean().optional(),
  originLng: z.boolean().optional(),
  destinationName: z.boolean().optional(),
  destinationLat: z.boolean().optional(),
  destinationLng: z.boolean().optional(),
  distanceKm: z.boolean().optional(),
  durationMinutes: z.boolean().optional(),
  cost: z.boolean().optional(),
  status: z.boolean().optional(),
  routeGeoJson: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const FreightLoadSelectObjectSchema: z.ZodType<Prisma.FreightLoadSelect> = makeSchema() as unknown as z.ZodType<Prisma.FreightLoadSelect>;
export const FreightLoadSelectObjectZodSchema = makeSchema();
