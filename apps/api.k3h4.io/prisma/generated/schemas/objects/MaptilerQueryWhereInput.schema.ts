import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserNullableScalarRelationFilterObjectSchema as UserNullableScalarRelationFilterObjectSchema } from './UserNullableScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { MaptilerCacheEntryListRelationFilterObjectSchema as MaptilerCacheEntryListRelationFilterObjectSchema } from './MaptilerCacheEntryListRelationFilter.schema'

const maptilerquerywhereinputSchema = z.object({
  AND: z.union([z.lazy(() => MaptilerQueryWhereInputObjectSchema), z.lazy(() => MaptilerQueryWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => MaptilerQueryWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => MaptilerQueryWhereInputObjectSchema), z.lazy(() => MaptilerQueryWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  signature: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  kind: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  path: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  params: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  lastUsedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => UserNullableScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  cacheEntries: z.lazy(() => MaptilerCacheEntryListRelationFilterObjectSchema).optional()
}).strict();
export const MaptilerQueryWhereInputObjectSchema: z.ZodType<Prisma.MaptilerQueryWhereInput> = maptilerquerywhereinputSchema as unknown as z.ZodType<Prisma.MaptilerQueryWhereInput>;
export const MaptilerQueryWhereInputObjectZodSchema = maptilerquerywhereinputSchema;
