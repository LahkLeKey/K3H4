import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema'

const usdareleasescalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => UsdaReleaseScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => UsdaReleaseScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => UsdaReleaseScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => UsdaReleaseScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => UsdaReleaseScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  dataset: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  scope: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  releasedOn: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  note: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  fetchedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const UsdaReleaseScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.UsdaReleaseScalarWhereWithAggregatesInput> = usdareleasescalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.UsdaReleaseScalarWhereWithAggregatesInput>;
export const UsdaReleaseScalarWhereWithAggregatesInputObjectZodSchema = usdareleasescalarwherewithaggregatesinputSchema;
