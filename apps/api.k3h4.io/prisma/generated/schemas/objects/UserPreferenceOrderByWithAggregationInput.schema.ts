import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserPreferenceCountOrderByAggregateInputObjectSchema as UserPreferenceCountOrderByAggregateInputObjectSchema } from './UserPreferenceCountOrderByAggregateInput.schema';
import { UserPreferenceAvgOrderByAggregateInputObjectSchema as UserPreferenceAvgOrderByAggregateInputObjectSchema } from './UserPreferenceAvgOrderByAggregateInput.schema';
import { UserPreferenceMaxOrderByAggregateInputObjectSchema as UserPreferenceMaxOrderByAggregateInputObjectSchema } from './UserPreferenceMaxOrderByAggregateInput.schema';
import { UserPreferenceMinOrderByAggregateInputObjectSchema as UserPreferenceMinOrderByAggregateInputObjectSchema } from './UserPreferenceMinOrderByAggregateInput.schema';
import { UserPreferenceSumOrderByAggregateInputObjectSchema as UserPreferenceSumOrderByAggregateInputObjectSchema } from './UserPreferenceSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  theme: SortOrderSchema.optional(),
  locale: SortOrderSchema.optional(),
  timezone: SortOrderSchema.optional(),
  marketingOptIn: SortOrderSchema.optional(),
  note: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  lastCenterLat: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  lastCenterLng: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  lastZoom: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  lastBearing: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  lastPitch: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  lastPoiSignature: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  lastPoiKinds: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  lastPoiRadiusM: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  lastPoiCount: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  lastPoiFetchedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  maptilerStyle: SortOrderSchema.optional(),
  maptilerLanguage: SortOrderSchema.optional(),
  maptilerLastPath: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  maptilerLastParams: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  maptilerLastKind: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  maptilerLastSignature: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  maptilerLastFetchedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => UserPreferenceCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => UserPreferenceAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => UserPreferenceMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => UserPreferenceMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => UserPreferenceSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const UserPreferenceOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.UserPreferenceOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.UserPreferenceOrderByWithAggregationInput>;
export const UserPreferenceOrderByWithAggregationInputObjectZodSchema = makeSchema();
