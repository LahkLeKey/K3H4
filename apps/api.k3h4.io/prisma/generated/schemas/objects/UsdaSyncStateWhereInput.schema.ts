import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const usdasyncstatewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => UsdaSyncStateWhereInputObjectSchema), z.lazy(() => UsdaSyncStateWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => UsdaSyncStateWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => UsdaSyncStateWhereInputObjectSchema), z.lazy(() => UsdaSyncStateWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  dataset: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  scope: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  lastReleaseOn: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  lastSyncedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  note: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const UsdaSyncStateWhereInputObjectSchema: z.ZodType<Prisma.UsdaSyncStateWhereInput> = usdasyncstatewhereinputSchema as unknown as z.ZodType<Prisma.UsdaSyncStateWhereInput>;
export const UsdaSyncStateWhereInputObjectZodSchema = usdasyncstatewhereinputSchema;
