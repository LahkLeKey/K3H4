import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  sourceId: z.string(),
  targetId: z.string(),
  jaccardScore: z.number(),
  intersectionCount: z.number().int(),
  unionCount: z.number().int(),
  overlappingTokens: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  computedAt: z.coerce.date().optional(),
  rationale: z.string().optional().nullable(),
  status: z.string().optional()
}).strict();
export const PersonaCompatibilityUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.PersonaCompatibilityUncheckedCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCompatibilityUncheckedCreateWithoutUserInput>;
export const PersonaCompatibilityUncheckedCreateWithoutUserInputObjectZodSchema = makeSchema();
