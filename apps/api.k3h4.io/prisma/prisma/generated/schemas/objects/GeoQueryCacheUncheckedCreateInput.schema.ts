import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string().optional().nullable(),
  type: z.string(),
  signature: z.string(),
  params: z.union([JsonNullValueInputSchema, jsonSchema]),
  payload: z.union([JsonNullValueInputSchema, jsonSchema]),
  count: z.number().int().optional().nullable(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();
export const GeoQueryCacheUncheckedCreateInputObjectSchema: z.ZodType<Prisma.GeoQueryCacheUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoQueryCacheUncheckedCreateInput>;
export const GeoQueryCacheUncheckedCreateInputObjectZodSchema = makeSchema();
