import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { ActorCreateNestedOneWithoutCachesInputObjectSchema as ActorCreateNestedOneWithoutCachesInputObjectSchema } from './ActorCreateNestedOneWithoutCachesInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  key: z.string(),
  payload: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  expiresAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  actor: z.lazy(() => ActorCreateNestedOneWithoutCachesInputObjectSchema)
}).strict();
export const ActorCacheCreateInputObjectSchema: z.ZodType<Prisma.ActorCacheCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorCacheCreateInput>;
export const ActorCacheCreateInputObjectZodSchema = makeSchema();
