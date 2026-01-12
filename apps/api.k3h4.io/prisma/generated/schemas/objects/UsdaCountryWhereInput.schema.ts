import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const usdacountrywhereinputSchema = z.object({
  AND: z.union([z.lazy(() => UsdaCountryWhereInputObjectSchema), z.lazy(() => UsdaCountryWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => UsdaCountryWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => UsdaCountryWhereInputObjectSchema), z.lazy(() => UsdaCountryWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  dataset: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  code: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  regionCode: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  extra: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const UsdaCountryWhereInputObjectSchema: z.ZodType<Prisma.UsdaCountryWhereInput> = usdacountrywhereinputSchema as unknown as z.ZodType<Prisma.UsdaCountryWhereInput>;
export const UsdaCountryWhereInputObjectZodSchema = usdacountrywhereinputSchema;
