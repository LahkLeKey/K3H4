import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { UserCreateNestedOneWithoutPersonaCompatibilitiesInputObjectSchema as UserCreateNestedOneWithoutPersonaCompatibilitiesInputObjectSchema } from './UserCreateNestedOneWithoutPersonaCompatibilitiesInput.schema';
import { PersonaCreateNestedOneWithoutCompatibilityTargetsInputObjectSchema as PersonaCreateNestedOneWithoutCompatibilityTargetsInputObjectSchema } from './PersonaCreateNestedOneWithoutCompatibilityTargetsInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  jaccardScore: z.number(),
  intersectionCount: z.number().int(),
  unionCount: z.number().int(),
  overlappingTokens: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  computedAt: z.coerce.date().optional(),
  rationale: z.string().optional().nullable(),
  status: LifecycleStatusSchema.optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutPersonaCompatibilitiesInputObjectSchema),
  target: z.lazy(() => PersonaCreateNestedOneWithoutCompatibilityTargetsInputObjectSchema)
}).strict();
export const PersonaCompatibilityCreateWithoutSourceInputObjectSchema: z.ZodType<Prisma.PersonaCompatibilityCreateWithoutSourceInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCompatibilityCreateWithoutSourceInput>;
export const PersonaCompatibilityCreateWithoutSourceInputObjectZodSchema = makeSchema();
