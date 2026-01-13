import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaAttributeCreateWithoutPersonaInputObjectSchema as PersonaAttributeCreateWithoutPersonaInputObjectSchema } from './PersonaAttributeCreateWithoutPersonaInput.schema';
import { PersonaAttributeUncheckedCreateWithoutPersonaInputObjectSchema as PersonaAttributeUncheckedCreateWithoutPersonaInputObjectSchema } from './PersonaAttributeUncheckedCreateWithoutPersonaInput.schema';
import { PersonaAttributeCreateOrConnectWithoutPersonaInputObjectSchema as PersonaAttributeCreateOrConnectWithoutPersonaInputObjectSchema } from './PersonaAttributeCreateOrConnectWithoutPersonaInput.schema';
import { PersonaAttributeUpsertWithWhereUniqueWithoutPersonaInputObjectSchema as PersonaAttributeUpsertWithWhereUniqueWithoutPersonaInputObjectSchema } from './PersonaAttributeUpsertWithWhereUniqueWithoutPersonaInput.schema';
import { PersonaAttributeCreateManyPersonaInputEnvelopeObjectSchema as PersonaAttributeCreateManyPersonaInputEnvelopeObjectSchema } from './PersonaAttributeCreateManyPersonaInputEnvelope.schema';
import { PersonaAttributeWhereUniqueInputObjectSchema as PersonaAttributeWhereUniqueInputObjectSchema } from './PersonaAttributeWhereUniqueInput.schema';
import { PersonaAttributeUpdateWithWhereUniqueWithoutPersonaInputObjectSchema as PersonaAttributeUpdateWithWhereUniqueWithoutPersonaInputObjectSchema } from './PersonaAttributeUpdateWithWhereUniqueWithoutPersonaInput.schema';
import { PersonaAttributeUpdateManyWithWhereWithoutPersonaInputObjectSchema as PersonaAttributeUpdateManyWithWhereWithoutPersonaInputObjectSchema } from './PersonaAttributeUpdateManyWithWhereWithoutPersonaInput.schema';
import { PersonaAttributeScalarWhereInputObjectSchema as PersonaAttributeScalarWhereInputObjectSchema } from './PersonaAttributeScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PersonaAttributeCreateWithoutPersonaInputObjectSchema), z.lazy(() => PersonaAttributeCreateWithoutPersonaInputObjectSchema).array(), z.lazy(() => PersonaAttributeUncheckedCreateWithoutPersonaInputObjectSchema), z.lazy(() => PersonaAttributeUncheckedCreateWithoutPersonaInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PersonaAttributeCreateOrConnectWithoutPersonaInputObjectSchema), z.lazy(() => PersonaAttributeCreateOrConnectWithoutPersonaInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => PersonaAttributeUpsertWithWhereUniqueWithoutPersonaInputObjectSchema), z.lazy(() => PersonaAttributeUpsertWithWhereUniqueWithoutPersonaInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PersonaAttributeCreateManyPersonaInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => PersonaAttributeWhereUniqueInputObjectSchema), z.lazy(() => PersonaAttributeWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => PersonaAttributeWhereUniqueInputObjectSchema), z.lazy(() => PersonaAttributeWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => PersonaAttributeWhereUniqueInputObjectSchema), z.lazy(() => PersonaAttributeWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => PersonaAttributeWhereUniqueInputObjectSchema), z.lazy(() => PersonaAttributeWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => PersonaAttributeUpdateWithWhereUniqueWithoutPersonaInputObjectSchema), z.lazy(() => PersonaAttributeUpdateWithWhereUniqueWithoutPersonaInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => PersonaAttributeUpdateManyWithWhereWithoutPersonaInputObjectSchema), z.lazy(() => PersonaAttributeUpdateManyWithWhereWithoutPersonaInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => PersonaAttributeScalarWhereInputObjectSchema), z.lazy(() => PersonaAttributeScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const PersonaAttributeUncheckedUpdateManyWithoutPersonaNestedInputObjectSchema: z.ZodType<Prisma.PersonaAttributeUncheckedUpdateManyWithoutPersonaNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaAttributeUncheckedUpdateManyWithoutPersonaNestedInput>;
export const PersonaAttributeUncheckedUpdateManyWithoutPersonaNestedInputObjectZodSchema = makeSchema();
