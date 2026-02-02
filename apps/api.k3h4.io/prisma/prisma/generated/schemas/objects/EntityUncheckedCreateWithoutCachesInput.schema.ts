import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

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
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const EntityUncheckedCreateWithoutCachesInputObjectSchema: z.ZodType<Prisma.EntityUncheckedCreateWithoutCachesInput> = makeSchema() as unknown as z.ZodType<Prisma.EntityUncheckedCreateWithoutCachesInput>;
export const EntityUncheckedCreateWithoutCachesInputObjectZodSchema = makeSchema();
