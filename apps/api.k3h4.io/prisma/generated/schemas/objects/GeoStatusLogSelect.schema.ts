import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  status: z.boolean().optional(),
  poiStatus: z.boolean().optional(),
  centerLat: z.boolean().optional(),
  centerLng: z.boolean().optional(),
  error: z.boolean().optional(),
  userAgent: z.boolean().optional(),
  createdAt: z.boolean().optional()
}).strict();
export const GeoStatusLogSelectObjectSchema: z.ZodType<Prisma.GeoStatusLogSelect> = makeSchema() as unknown as z.ZodType<Prisma.GeoStatusLogSelect>;
export const GeoStatusLogSelectObjectZodSchema = makeSchema();
