import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  actorId: z.string(),
  key: z.string(),
  payload: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  expiresAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const ActorCacheCreateManyInputObjectSchema: z.ZodType<Prisma.ActorCacheCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorCacheCreateManyInput>;
export const ActorCacheCreateManyInputObjectZodSchema = makeSchema();
