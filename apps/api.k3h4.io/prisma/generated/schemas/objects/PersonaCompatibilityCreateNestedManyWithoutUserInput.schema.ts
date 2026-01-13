import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCompatibilityCreateWithoutUserInputObjectSchema as PersonaCompatibilityCreateWithoutUserInputObjectSchema } from './PersonaCompatibilityCreateWithoutUserInput.schema';
import { PersonaCompatibilityUncheckedCreateWithoutUserInputObjectSchema as PersonaCompatibilityUncheckedCreateWithoutUserInputObjectSchema } from './PersonaCompatibilityUncheckedCreateWithoutUserInput.schema';
import { PersonaCompatibilityCreateOrConnectWithoutUserInputObjectSchema as PersonaCompatibilityCreateOrConnectWithoutUserInputObjectSchema } from './PersonaCompatibilityCreateOrConnectWithoutUserInput.schema';
import { PersonaCompatibilityCreateManyUserInputEnvelopeObjectSchema as PersonaCompatibilityCreateManyUserInputEnvelopeObjectSchema } from './PersonaCompatibilityCreateManyUserInputEnvelope.schema';
import { PersonaCompatibilityWhereUniqueInputObjectSchema as PersonaCompatibilityWhereUniqueInputObjectSchema } from './PersonaCompatibilityWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PersonaCompatibilityCreateWithoutUserInputObjectSchema), z.lazy(() => PersonaCompatibilityCreateWithoutUserInputObjectSchema).array(), z.lazy(() => PersonaCompatibilityUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => PersonaCompatibilityUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PersonaCompatibilityCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => PersonaCompatibilityCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PersonaCompatibilityCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => PersonaCompatibilityWhereUniqueInputObjectSchema), z.lazy(() => PersonaCompatibilityWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const PersonaCompatibilityCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.PersonaCompatibilityCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCompatibilityCreateNestedManyWithoutUserInput>;
export const PersonaCompatibilityCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
