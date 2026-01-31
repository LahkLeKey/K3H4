import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { JsonNullableWithAggregatesFilterObjectSchema as JsonNullableWithAggregatesFilterObjectSchema } from './JsonNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const maptilerqueryscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => MaptilerQueryScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => MaptilerQueryScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => MaptilerQueryScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => MaptilerQueryScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => MaptilerQueryScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  actorId: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  signature: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  kind: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  path: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  params: z.lazy(() => JsonNullableWithAggregatesFilterObjectSchema).optional(),
  lastUsedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const MaptilerQueryScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.MaptilerQueryScalarWhereWithAggregatesInput> = maptilerqueryscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.MaptilerQueryScalarWhereWithAggregatesInput>;
export const MaptilerQueryScalarWhereWithAggregatesInputObjectZodSchema = maptilerqueryscalarwherewithaggregatesinputSchema;
