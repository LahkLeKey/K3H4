import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaAttributeCreateWithoutUserInputObjectSchema as PersonaAttributeCreateWithoutUserInputObjectSchema } from './PersonaAttributeCreateWithoutUserInput.schema';
import { PersonaAttributeUncheckedCreateWithoutUserInputObjectSchema as PersonaAttributeUncheckedCreateWithoutUserInputObjectSchema } from './PersonaAttributeUncheckedCreateWithoutUserInput.schema';
import { PersonaAttributeCreateOrConnectWithoutUserInputObjectSchema as PersonaAttributeCreateOrConnectWithoutUserInputObjectSchema } from './PersonaAttributeCreateOrConnectWithoutUserInput.schema';
import { PersonaAttributeCreateManyUserInputEnvelopeObjectSchema as PersonaAttributeCreateManyUserInputEnvelopeObjectSchema } from './PersonaAttributeCreateManyUserInputEnvelope.schema';
import { PersonaAttributeWhereUniqueInputObjectSchema as PersonaAttributeWhereUniqueInputObjectSchema } from './PersonaAttributeWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PersonaAttributeCreateWithoutUserInputObjectSchema), z.lazy(() => PersonaAttributeCreateWithoutUserInputObjectSchema).array(), z.lazy(() => PersonaAttributeUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => PersonaAttributeUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PersonaAttributeCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => PersonaAttributeCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PersonaAttributeCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => PersonaAttributeWhereUniqueInputObjectSchema), z.lazy(() => PersonaAttributeWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const PersonaAttributeCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.PersonaAttributeCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaAttributeCreateNestedManyWithoutUserInput>;
export const PersonaAttributeCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
