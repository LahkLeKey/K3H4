import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { UserCreateNestedOneWithoutPersonaCompatibilitiesInputObjectSchema as UserCreateNestedOneWithoutPersonaCompatibilitiesInputObjectSchema } from './UserCreateNestedOneWithoutPersonaCompatibilitiesInput.schema';
import { PersonaCreateNestedOneWithoutCompatibilitySourcesInputObjectSchema as PersonaCreateNestedOneWithoutCompatibilitySourcesInputObjectSchema } from './PersonaCreateNestedOneWithoutCompatibilitySourcesInput.schema';
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
  status: z.string().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutPersonaCompatibilitiesInputObjectSchema),
  source: z.lazy(() => PersonaCreateNestedOneWithoutCompatibilitySourcesInputObjectSchema),
  target: z.lazy(() => PersonaCreateNestedOneWithoutCompatibilityTargetsInputObjectSchema)
}).strict();
export const PersonaCompatibilityCreateInputObjectSchema: z.ZodType<Prisma.PersonaCompatibilityCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCompatibilityCreateInput>;
export const PersonaCompatibilityCreateInputObjectZodSchema = makeSchema();
