import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaAttributeCreateWithoutPersonaInputObjectSchema as PersonaAttributeCreateWithoutPersonaInputObjectSchema } from './PersonaAttributeCreateWithoutPersonaInput.schema';
import { PersonaAttributeUncheckedCreateWithoutPersonaInputObjectSchema as PersonaAttributeUncheckedCreateWithoutPersonaInputObjectSchema } from './PersonaAttributeUncheckedCreateWithoutPersonaInput.schema';
import { PersonaAttributeCreateOrConnectWithoutPersonaInputObjectSchema as PersonaAttributeCreateOrConnectWithoutPersonaInputObjectSchema } from './PersonaAttributeCreateOrConnectWithoutPersonaInput.schema';
import { PersonaAttributeCreateManyPersonaInputEnvelopeObjectSchema as PersonaAttributeCreateManyPersonaInputEnvelopeObjectSchema } from './PersonaAttributeCreateManyPersonaInputEnvelope.schema';
import { PersonaAttributeWhereUniqueInputObjectSchema as PersonaAttributeWhereUniqueInputObjectSchema } from './PersonaAttributeWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PersonaAttributeCreateWithoutPersonaInputObjectSchema), z.lazy(() => PersonaAttributeCreateWithoutPersonaInputObjectSchema).array(), z.lazy(() => PersonaAttributeUncheckedCreateWithoutPersonaInputObjectSchema), z.lazy(() => PersonaAttributeUncheckedCreateWithoutPersonaInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PersonaAttributeCreateOrConnectWithoutPersonaInputObjectSchema), z.lazy(() => PersonaAttributeCreateOrConnectWithoutPersonaInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PersonaAttributeCreateManyPersonaInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => PersonaAttributeWhereUniqueInputObjectSchema), z.lazy(() => PersonaAttributeWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const PersonaAttributeUncheckedCreateNestedManyWithoutPersonaInputObjectSchema: z.ZodType<Prisma.PersonaAttributeUncheckedCreateNestedManyWithoutPersonaInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaAttributeUncheckedCreateNestedManyWithoutPersonaInput>;
export const PersonaAttributeUncheckedCreateNestedManyWithoutPersonaInputObjectZodSchema = makeSchema();
