import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { UserCreateNestedOneWithoutPersonaCompatibilitiesInputObjectSchema as UserCreateNestedOneWithoutPersonaCompatibilitiesInputObjectSchema } from './UserCreateNestedOneWithoutPersonaCompatibilitiesInput.schema';
import { PersonaCreateNestedOneWithoutCompatibilitySourcesInputObjectSchema as PersonaCreateNestedOneWithoutCompatibilitySourcesInputObjectSchema } from './PersonaCreateNestedOneWithoutCompatibilitySourcesInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  jaccardScore: z.number(),
  intersectionCount: z.number().int(),
  unionCount: z.number().int(),
  overlappingTokens: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  computedAt: z.coerce.date().optional(),
  rationale: z.string().optional().nullable(),
  status: z.string().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutPersonaCompatibilitiesInputObjectSchema),
  source: z.lazy(() => PersonaCreateNestedOneWithoutCompatibilitySourcesInputObjectSchema)
}).strict();
export const PersonaCompatibilityCreateWithoutTargetInputObjectSchema: z.ZodType<Prisma.PersonaCompatibilityCreateWithoutTargetInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCompatibilityCreateWithoutTargetInput>;
export const PersonaCompatibilityCreateWithoutTargetInputObjectZodSchema = makeSchema();
