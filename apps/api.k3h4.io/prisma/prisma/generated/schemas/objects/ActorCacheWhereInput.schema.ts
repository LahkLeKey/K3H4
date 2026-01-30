import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { ActorScalarRelationFilterObjectSchema as ActorScalarRelationFilterObjectSchema } from './ActorScalarRelationFilter.schema';
import { ActorWhereInputObjectSchema as ActorWhereInputObjectSchema } from './ActorWhereInput.schema'

const actorcachewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ActorCacheWhereInputObjectSchema), z.lazy(() => ActorCacheWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ActorCacheWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ActorCacheWhereInputObjectSchema), z.lazy(() => ActorCacheWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  actorId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  key: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  payload: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  expiresAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  actor: z.union([z.lazy(() => ActorScalarRelationFilterObjectSchema), z.lazy(() => ActorWhereInputObjectSchema)]).optional()
}).strict();
export const ActorCacheWhereInputObjectSchema: z.ZodType<Prisma.ActorCacheWhereInput> = actorcachewhereinputSchema as unknown as z.ZodType<Prisma.ActorCacheWhereInput>;
export const ActorCacheWhereInputObjectZodSchema = actorcachewhereinputSchema;
