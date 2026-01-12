import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema as DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const usdasyncstatescalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => UsdaSyncStateScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => UsdaSyncStateScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => UsdaSyncStateScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => UsdaSyncStateScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => UsdaSyncStateScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  dataset: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  scope: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  lastReleaseOn: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  lastSyncedAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  note: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const UsdaSyncStateScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.UsdaSyncStateScalarWhereWithAggregatesInput> = usdasyncstatescalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.UsdaSyncStateScalarWhereWithAggregatesInput>;
export const UsdaSyncStateScalarWhereWithAggregatesInputObjectZodSchema = usdasyncstatescalarwherewithaggregatesinputSchema;
