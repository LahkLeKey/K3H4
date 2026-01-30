import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  key: z.string(),
  payload: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  expiresAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const ActorCacheUncheckedCreateWithoutActorInputObjectSchema: z.ZodType<Prisma.ActorCacheUncheckedCreateWithoutActorInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorCacheUncheckedCreateWithoutActorInput>;
export const ActorCacheUncheckedCreateWithoutActorInputObjectZodSchema = makeSchema();
