import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema'

const usdareleasewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => UsdaReleaseWhereInputObjectSchema), z.lazy(() => UsdaReleaseWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => UsdaReleaseWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => UsdaReleaseWhereInputObjectSchema), z.lazy(() => UsdaReleaseWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  dataset: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  scope: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  releasedOn: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  note: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  fetchedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const UsdaReleaseWhereInputObjectSchema: z.ZodType<Prisma.UsdaReleaseWhereInput> = usdareleasewhereinputSchema as unknown as z.ZodType<Prisma.UsdaReleaseWhereInput>;
export const UsdaReleaseWhereInputObjectZodSchema = usdareleasewhereinputSchema;
