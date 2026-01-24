import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const usdacommoditywhereinputSchema = z.object({
  AND: z.union([z.lazy(() => UsdaCommodityWhereInputObjectSchema), z.lazy(() => UsdaCommodityWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => UsdaCommodityWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => UsdaCommodityWhereInputObjectSchema), z.lazy(() => UsdaCommodityWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  dataset: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  code: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  wikidataId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  enrichment: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  extra: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const UsdaCommodityWhereInputObjectSchema: z.ZodType<Prisma.UsdaCommodityWhereInput> = usdacommoditywhereinputSchema as unknown as z.ZodType<Prisma.UsdaCommodityWhereInput>;
export const UsdaCommodityWhereInputObjectZodSchema = usdacommoditywhereinputSchema;
