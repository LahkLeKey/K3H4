import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { EntityCacheUncheckedCreateNestedManyWithoutEntityInputObjectSchema as EntityCacheUncheckedCreateNestedManyWithoutEntityInputObjectSchema } from './EntityCacheUncheckedCreateNestedManyWithoutEntityInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  actorId: z.string(),
  kind: z.string(),
  direction: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  targetType: z.string().optional().nullable(),
  targetId: z.string().optional().nullable(),
  source: z.string().optional().nullable(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  isGlobal: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  caches: z.lazy(() => EntityCacheUncheckedCreateNestedManyWithoutEntityInputObjectSchema).optional()
}).strict();
export const EntityUncheckedCreateInputObjectSchema: z.ZodType<Prisma.EntityUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.EntityUncheckedCreateInput>;
export const EntityUncheckedCreateInputObjectZodSchema = makeSchema();
