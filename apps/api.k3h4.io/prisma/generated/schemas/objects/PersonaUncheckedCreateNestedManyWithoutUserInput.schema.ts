import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCreateWithoutUserInputObjectSchema as PersonaCreateWithoutUserInputObjectSchema } from './PersonaCreateWithoutUserInput.schema';
import { PersonaUncheckedCreateWithoutUserInputObjectSchema as PersonaUncheckedCreateWithoutUserInputObjectSchema } from './PersonaUncheckedCreateWithoutUserInput.schema';
import { PersonaCreateOrConnectWithoutUserInputObjectSchema as PersonaCreateOrConnectWithoutUserInputObjectSchema } from './PersonaCreateOrConnectWithoutUserInput.schema';
import { PersonaCreateManyUserInputEnvelopeObjectSchema as PersonaCreateManyUserInputEnvelopeObjectSchema } from './PersonaCreateManyUserInputEnvelope.schema';
import { PersonaWhereUniqueInputObjectSchema as PersonaWhereUniqueInputObjectSchema } from './PersonaWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PersonaCreateWithoutUserInputObjectSchema), z.lazy(() => PersonaCreateWithoutUserInputObjectSchema).array(), z.lazy(() => PersonaUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => PersonaUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PersonaCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => PersonaCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PersonaCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => PersonaWhereUniqueInputObjectSchema), z.lazy(() => PersonaWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const PersonaUncheckedCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.PersonaUncheckedCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaUncheckedCreateNestedManyWithoutUserInput>;
export const PersonaUncheckedCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
