import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  signature: SortOrderSchema.optional(),
  zoomBand: SortOrderSchema.optional(),
  bboxMinLat: SortOrderSchema.optional(),
  bboxMinLng: SortOrderSchema.optional(),
  bboxMaxLat: SortOrderSchema.optional(),
  bboxMaxLng: SortOrderSchema.optional(),
  lastPoiIds: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  lastPoiCount: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  firstViewedAt: SortOrderSchema.optional(),
  lastViewedAt: SortOrderSchema.optional(),
  viewCount: SortOrderSchema.optional(),
  staleAfter: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const GeoViewHistoryOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.GeoViewHistoryOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoViewHistoryOrderByWithRelationInput>;
export const GeoViewHistoryOrderByWithRelationInputObjectZodSchema = makeSchema();
