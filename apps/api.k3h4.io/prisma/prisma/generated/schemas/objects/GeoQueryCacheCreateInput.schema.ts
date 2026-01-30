import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';
import { UserCreateNestedOneWithoutGeoQueryCachesInputObjectSchema as UserCreateNestedOneWithoutGeoQueryCachesInputObjectSchema } from './UserCreateNestedOneWithoutGeoQueryCachesInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  type: z.string(),
  signature: z.string(),
  params: z.union([JsonNullValueInputSchema, jsonSchema]),
  payload: z.union([JsonNullValueInputSchema, jsonSchema]),
  count: z.number().int().optional().nullable(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutGeoQueryCachesInputObjectSchema).optional()
}).strict();
export const GeoQueryCacheCreateInputObjectSchema: z.ZodType<Prisma.GeoQueryCacheCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoQueryCacheCreateInput>;
export const GeoQueryCacheCreateInputObjectZodSchema = makeSchema();
