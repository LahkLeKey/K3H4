import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { BytesNullableFilterObjectSchema as BytesNullableFilterObjectSchema } from './BytesNullableFilter.schema';
import { IntNullableFilterObjectSchema as IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const geodemtilecachescalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => GeoDemTileCacheScalarWhereInputObjectSchema), z.lazy(() => GeoDemTileCacheScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => GeoDemTileCacheScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => GeoDemTileCacheScalarWhereInputObjectSchema), z.lazy(() => GeoDemTileCacheScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  provider: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  source: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  signature: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  z: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  x: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  y: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  format: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  url: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  data: z.union([z.lazy(() => BytesNullableFilterObjectSchema), z.instanceof(Uint8Array)]).optional().nullable(),
  byteLength: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  etag: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  cacheControl: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  expiresAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  fetchedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  lastAccessed: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const GeoDemTileCacheScalarWhereInputObjectSchema: z.ZodType<Prisma.GeoDemTileCacheScalarWhereInput> = geodemtilecachescalarwhereinputSchema as unknown as z.ZodType<Prisma.GeoDemTileCacheScalarWhereInput>;
export const GeoDemTileCacheScalarWhereInputObjectZodSchema = geodemtilecachescalarwhereinputSchema;
