import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema'

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
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const UserPreferenceOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.UserPreferenceOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.UserPreferenceOrderByWithRelationInput>;
export const UserPreferenceOrderByWithRelationInputObjectZodSchema = makeSchema();
