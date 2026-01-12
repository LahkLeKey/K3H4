import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema as DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const providergrantscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => ProviderGrantScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ProviderGrantScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ProviderGrantScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ProviderGrantScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ProviderGrantScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  provider: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  providerId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  accessToken: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  scope: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  expiresAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const ProviderGrantScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.ProviderGrantScalarWhereWithAggregatesInput> = providergrantscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.ProviderGrantScalarWhereWithAggregatesInput>;
export const ProviderGrantScalarWhereWithAggregatesInputObjectZodSchema = providergrantscalarwherewithaggregatesinputSchema;
