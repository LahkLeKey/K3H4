import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  targetId: z.string(),
  jaccardScore: z.number(),
  intersectionCount: z.number().int(),
  unionCount: z.number().int(),
  overlappingTokens: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  computedAt: z.coerce.date().optional(),
  rationale: z.string().optional().nullable(),
  status: LifecycleStatusSchema.optional()
}).strict();
export const PersonaCompatibilityUncheckedCreateWithoutSourceInputObjectSchema: z.ZodType<Prisma.PersonaCompatibilityUncheckedCreateWithoutSourceInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCompatibilityUncheckedCreateWithoutSourceInput>;
export const PersonaCompatibilityUncheckedCreateWithoutSourceInputObjectZodSchema = makeSchema();
