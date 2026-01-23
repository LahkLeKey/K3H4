import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { JsonNullableWithAggregatesFilterObjectSchema as JsonNullableWithAggregatesFilterObjectSchema } from './JsonNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const usdacountryscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => UsdaCountryScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => UsdaCountryScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => UsdaCountryScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => UsdaCountryScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => UsdaCountryScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  dataset: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  code: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  regionCode: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  wikidataId: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  enrichment: z.lazy(() => JsonNullableWithAggregatesFilterObjectSchema).optional(),
  extra: z.lazy(() => JsonNullableWithAggregatesFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const UsdaCountryScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.UsdaCountryScalarWhereWithAggregatesInput> = usdacountryscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.UsdaCountryScalarWhereWithAggregatesInput>;
export const UsdaCountryScalarWhereWithAggregatesInputObjectZodSchema = usdacountryscalarwherewithaggregatesinputSchema;
