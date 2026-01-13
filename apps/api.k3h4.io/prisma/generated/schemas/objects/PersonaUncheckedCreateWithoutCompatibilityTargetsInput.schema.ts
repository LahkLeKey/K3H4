import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { AssignmentUncheckedCreateNestedManyWithoutPersonaInputObjectSchema as AssignmentUncheckedCreateNestedManyWithoutPersonaInputObjectSchema } from './AssignmentUncheckedCreateNestedManyWithoutPersonaInput.schema';
import { AssignmentPayoutUncheckedCreateNestedManyWithoutPersonaInputObjectSchema as AssignmentPayoutUncheckedCreateNestedManyWithoutPersonaInputObjectSchema } from './AssignmentPayoutUncheckedCreateNestedManyWithoutPersonaInput.schema';
import { PersonaAttributeUncheckedCreateNestedManyWithoutPersonaInputObjectSchema as PersonaAttributeUncheckedCreateNestedManyWithoutPersonaInputObjectSchema } from './PersonaAttributeUncheckedCreateNestedManyWithoutPersonaInput.schema';
import { PersonaCompatibilityUncheckedCreateNestedManyWithoutSourceInputObjectSchema as PersonaCompatibilityUncheckedCreateNestedManyWithoutSourceInputObjectSchema } from './PersonaCompatibilityUncheckedCreateNestedManyWithoutSourceInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  alias: z.string(),
  account: z.string(),
  handle: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  tags: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  assignments: z.lazy(() => AssignmentUncheckedCreateNestedManyWithoutPersonaInputObjectSchema).optional(),
  assignmentPayouts: z.lazy(() => AssignmentPayoutUncheckedCreateNestedManyWithoutPersonaInputObjectSchema).optional(),
  attributes: z.lazy(() => PersonaAttributeUncheckedCreateNestedManyWithoutPersonaInputObjectSchema).optional(),
  compatibilitySources: z.lazy(() => PersonaCompatibilityUncheckedCreateNestedManyWithoutSourceInputObjectSchema).optional()
}).strict();
export const PersonaUncheckedCreateWithoutCompatibilityTargetsInputObjectSchema: z.ZodType<Prisma.PersonaUncheckedCreateWithoutCompatibilityTargetsInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaUncheckedCreateWithoutCompatibilityTargetsInput>;
export const PersonaUncheckedCreateWithoutCompatibilityTargetsInputObjectZodSchema = makeSchema();
