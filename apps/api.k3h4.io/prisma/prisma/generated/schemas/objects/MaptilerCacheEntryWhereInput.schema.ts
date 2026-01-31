import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { IntNullableFilterObjectSchema as IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { BytesNullableFilterObjectSchema as BytesNullableFilterObjectSchema } from './BytesNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { UserNullableScalarRelationFilterObjectSchema as UserNullableScalarRelationFilterObjectSchema } from './UserNullableScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { ActorNullableScalarRelationFilterObjectSchema as ActorNullableScalarRelationFilterObjectSchema } from './ActorNullableScalarRelationFilter.schema';
import { ActorWhereInputObjectSchema as ActorWhereInputObjectSchema } from './ActorWhereInput.schema';
import { MaptilerQueryNullableScalarRelationFilterObjectSchema as MaptilerQueryNullableScalarRelationFilterObjectSchema } from './MaptilerQueryNullableScalarRelationFilter.schema';
import { MaptilerQueryWhereInputObjectSchema as MaptilerQueryWhereInputObjectSchema } from './MaptilerQueryWhereInput.schema'

const maptilercacheentrywhereinputSchema = z.object({
  AND: z.union([z.lazy(() => MaptilerCacheEntryWhereInputObjectSchema), z.lazy(() => MaptilerCacheEntryWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => MaptilerCacheEntryWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => MaptilerCacheEntryWhereInputObjectSchema), z.lazy(() => MaptilerCacheEntryWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  actorId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  queryId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  kind: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  path: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  params: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  paramsHash: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  signature: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  method: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  responseType: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  url: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  statusCode: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  payload: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  data: z.union([z.lazy(() => BytesNullableFilterObjectSchema), z.instanceof(Uint8Array)]).optional().nullable(),
  contentType: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  cacheControl: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  fetchedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  expiresAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => UserNullableScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  actor: z.union([z.lazy(() => ActorNullableScalarRelationFilterObjectSchema), z.lazy(() => ActorWhereInputObjectSchema)]).optional(),
  query: z.union([z.lazy(() => MaptilerQueryNullableScalarRelationFilterObjectSchema), z.lazy(() => MaptilerQueryWhereInputObjectSchema)]).optional()
}).strict();
export const MaptilerCacheEntryWhereInputObjectSchema: z.ZodType<Prisma.MaptilerCacheEntryWhereInput> = maptilercacheentrywhereinputSchema as unknown as z.ZodType<Prisma.MaptilerCacheEntryWhereInput>;
export const MaptilerCacheEntryWhereInputObjectZodSchema = maptilercacheentrywhereinputSchema;
