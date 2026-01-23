import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const usdaregionwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => UsdaRegionWhereInputObjectSchema), z.lazy(() => UsdaRegionWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => UsdaRegionWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => UsdaRegionWhereInputObjectSchema), z.lazy(() => UsdaRegionWhereInputObjectSchema).array()]).optional(),
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
export const UsdaRegionWhereInputObjectSchema: z.ZodType<Prisma.UsdaRegionWhereInput> = usdaregionwhereinputSchema as unknown as z.ZodType<Prisma.UsdaRegionWhereInput>;
export const UsdaRegionWhereInputObjectZodSchema = usdaregionwhereinputSchema;
