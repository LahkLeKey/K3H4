import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  theme: SortOrderSchema.optional(),
  locale: SortOrderSchema.optional(),
  timezone: SortOrderSchema.optional(),
  marketingOptIn: SortOrderSchema.optional(),
  note: SortOrderSchema.optional(),
  lastCenterLat: SortOrderSchema.optional(),
  lastCenterLng: SortOrderSchema.optional(),
  lastZoom: SortOrderSchema.optional(),
  lastBearing: SortOrderSchema.optional(),
  lastPitch: SortOrderSchema.optional(),
  lastPoiSignature: SortOrderSchema.optional(),
  lastPoiKinds: SortOrderSchema.optional(),
  lastPoiRadiusM: SortOrderSchema.optional(),
  lastPoiCount: SortOrderSchema.optional(),
  lastPoiFetchedAt: SortOrderSchema.optional(),
  maptilerStyle: SortOrderSchema.optional(),
  maptilerLanguage: SortOrderSchema.optional(),
  maptilerLastPath: SortOrderSchema.optional(),
  maptilerLastKind: SortOrderSchema.optional(),
  maptilerLastSignature: SortOrderSchema.optional(),
  maptilerLastFetchedAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const UserPreferenceMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UserPreferenceMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.UserPreferenceMaxOrderByAggregateInput>;
export const UserPreferenceMaxOrderByAggregateInputObjectZodSchema = makeSchema();
