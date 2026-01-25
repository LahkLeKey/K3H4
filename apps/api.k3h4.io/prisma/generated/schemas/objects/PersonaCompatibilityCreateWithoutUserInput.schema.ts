import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
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
  status: LifecycleStatusSchema.optional(),
  source: z.lazy(() => PersonaCreateNestedOneWithoutCompatibilitySourcesInputObjectSchema),
  target: z.lazy(() => PersonaCreateNestedOneWithoutCompatibilityTargetsInputObjectSchema)
}).strict();
export const PersonaCompatibilityCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.PersonaCompatibilityCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCompatibilityCreateWithoutUserInput>;
export const PersonaCompatibilityCreateWithoutUserInputObjectZodSchema = makeSchema();
