import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  signature: z.boolean().optional(),
  zoomBand: z.boolean().optional(),
  bboxMinLat: z.boolean().optional(),
  bboxMinLng: z.boolean().optional(),
  bboxMaxLat: z.boolean().optional(),
  bboxMaxLng: z.boolean().optional(),
  lastPoiIds: z.boolean().optional(),
  lastPoiCount: z.boolean().optional(),
  firstViewedAt: z.boolean().optional(),
  lastViewedAt: z.boolean().optional(),
  viewCount: z.boolean().optional(),
  staleAfter: z.boolean().optional()
}).strict();
export const GeoViewHistorySelectObjectSchema: z.ZodType<Prisma.GeoViewHistorySelect> = makeSchema() as unknown as z.ZodType<Prisma.GeoViewHistorySelect>;
export const GeoViewHistorySelectObjectZodSchema = makeSchema();
