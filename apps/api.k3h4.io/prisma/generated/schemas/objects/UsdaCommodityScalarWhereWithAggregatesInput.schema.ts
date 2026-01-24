import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { JsonNullableWithAggregatesFilterObjectSchema as JsonNullableWithAggregatesFilterObjectSchema } from './JsonNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const usdacommodityscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => UsdaCommodityScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => UsdaCommodityScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => UsdaCommodityScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => UsdaCommodityScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => UsdaCommodityScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  dataset: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  code: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  wikidataId: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  enrichment: z.lazy(() => JsonNullableWithAggregatesFilterObjectSchema).optional(),
  extra: z.lazy(() => JsonNullableWithAggregatesFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const UsdaCommodityScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.UsdaCommodityScalarWhereWithAggregatesInput> = usdacommodityscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.UsdaCommodityScalarWhereWithAggregatesInput>;
export const UsdaCommodityScalarWhereWithAggregatesInputObjectZodSchema = usdacommodityscalarwherewithaggregatesinputSchema;
