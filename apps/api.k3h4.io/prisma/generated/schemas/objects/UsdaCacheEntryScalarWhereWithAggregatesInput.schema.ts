import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { JsonNullableWithAggregatesFilterObjectSchema as JsonNullableWithAggregatesFilterObjectSchema } from './JsonNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema as DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema'

const usdacacheentryscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => UsdaCacheEntryScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => UsdaCacheEntryScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => UsdaCacheEntryScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => UsdaCacheEntryScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => UsdaCacheEntryScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  dataset: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  endpoint: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  params: z.lazy(() => JsonNullableWithAggregatesFilterObjectSchema).optional(),
  paramsHash: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  payload: z.lazy(() => JsonNullableWithAggregatesFilterObjectSchema).optional(),
  fetchedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  expiresAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const UsdaCacheEntryScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.UsdaCacheEntryScalarWhereWithAggregatesInput> = usdacacheentryscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.UsdaCacheEntryScalarWhereWithAggregatesInput>;
export const UsdaCacheEntryScalarWhereWithAggregatesInputObjectZodSchema = usdacacheentryscalarwherewithaggregatesinputSchema;
