import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  type: z.string(),
  signature: z.string(),
  params: z.union([JsonNullValueInputSchema, jsonSchema]),
  payload: z.union([JsonNullValueInputSchema, jsonSchema]),
  count: z.number().int().optional().nullable(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();
export const GeoQueryCacheCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.GeoQueryCacheCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoQueryCacheCreateWithoutUserInput>;
export const GeoQueryCacheCreateWithoutUserInputObjectZodSchema = makeSchema();
