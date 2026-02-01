import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { EntityCreateNestedOneWithoutCachesInputObjectSchema as EntityCreateNestedOneWithoutCachesInputObjectSchema } from './EntityCreateNestedOneWithoutCachesInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  key: z.string(),
  payload: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  expiresAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  entity: z.lazy(() => EntityCreateNestedOneWithoutCachesInputObjectSchema)
}).strict();
export const EntityCacheCreateInputObjectSchema: z.ZodType<Prisma.EntityCacheCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.EntityCacheCreateInput>;
export const EntityCacheCreateInputObjectZodSchema = makeSchema();
