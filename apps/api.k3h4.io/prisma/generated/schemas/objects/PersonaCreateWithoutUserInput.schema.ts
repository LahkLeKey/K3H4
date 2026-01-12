import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { AssignmentCreateNestedManyWithoutPersonaInputObjectSchema as AssignmentCreateNestedManyWithoutPersonaInputObjectSchema } from './AssignmentCreateNestedManyWithoutPersonaInput.schema';
import { AssignmentPayoutCreateNestedManyWithoutPersonaInputObjectSchema as AssignmentPayoutCreateNestedManyWithoutPersonaInputObjectSchema } from './AssignmentPayoutCreateNestedManyWithoutPersonaInput.schema';
import { PersonaAttributeCreateNestedManyWithoutPersonaInputObjectSchema as PersonaAttributeCreateNestedManyWithoutPersonaInputObjectSchema } from './PersonaAttributeCreateNestedManyWithoutPersonaInput.schema';
import { PersonaCompatibilityCreateNestedManyWithoutSourceInputObjectSchema as PersonaCompatibilityCreateNestedManyWithoutSourceInputObjectSchema } from './PersonaCompatibilityCreateNestedManyWithoutSourceInput.schema';
import { PersonaCompatibilityCreateNestedManyWithoutTargetInputObjectSchema as PersonaCompatibilityCreateNestedManyWithoutTargetInputObjectSchema } from './PersonaCompatibilityCreateNestedManyWithoutTargetInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  alias: z.string(),
  account: z.string(),
  handle: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  tags: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  assignments: z.lazy(() => AssignmentCreateNestedManyWithoutPersonaInputObjectSchema).optional(),
  assignmentPayouts: z.lazy(() => AssignmentPayoutCreateNestedManyWithoutPersonaInputObjectSchema).optional(),
  attributes: z.lazy(() => PersonaAttributeCreateNestedManyWithoutPersonaInputObjectSchema).optional(),
  compatibilitySources: z.lazy(() => PersonaCompatibilityCreateNestedManyWithoutSourceInputObjectSchema).optional(),
  compatibilityTargets: z.lazy(() => PersonaCompatibilityCreateNestedManyWithoutTargetInputObjectSchema).optional()
}).strict();
export const PersonaCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.PersonaCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCreateWithoutUserInput>;
export const PersonaCreateWithoutUserInputObjectZodSchema = makeSchema();
