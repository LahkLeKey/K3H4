import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaAttributeCreateWithoutUserInputObjectSchema as PersonaAttributeCreateWithoutUserInputObjectSchema } from './PersonaAttributeCreateWithoutUserInput.schema';
import { PersonaAttributeUncheckedCreateWithoutUserInputObjectSchema as PersonaAttributeUncheckedCreateWithoutUserInputObjectSchema } from './PersonaAttributeUncheckedCreateWithoutUserInput.schema';
import { PersonaAttributeCreateOrConnectWithoutUserInputObjectSchema as PersonaAttributeCreateOrConnectWithoutUserInputObjectSchema } from './PersonaAttributeCreateOrConnectWithoutUserInput.schema';
import { PersonaAttributeUpsertWithWhereUniqueWithoutUserInputObjectSchema as PersonaAttributeUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './PersonaAttributeUpsertWithWhereUniqueWithoutUserInput.schema';
import { PersonaAttributeCreateManyUserInputEnvelopeObjectSchema as PersonaAttributeCreateManyUserInputEnvelopeObjectSchema } from './PersonaAttributeCreateManyUserInputEnvelope.schema';
import { PersonaAttributeWhereUniqueInputObjectSchema as PersonaAttributeWhereUniqueInputObjectSchema } from './PersonaAttributeWhereUniqueInput.schema';
import { PersonaAttributeUpdateWithWhereUniqueWithoutUserInputObjectSchema as PersonaAttributeUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './PersonaAttributeUpdateWithWhereUniqueWithoutUserInput.schema';
import { PersonaAttributeUpdateManyWithWhereWithoutUserInputObjectSchema as PersonaAttributeUpdateManyWithWhereWithoutUserInputObjectSchema } from './PersonaAttributeUpdateManyWithWhereWithoutUserInput.schema';
import { PersonaAttributeScalarWhereInputObjectSchema as PersonaAttributeScalarWhereInputObjectSchema } from './PersonaAttributeScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PersonaAttributeCreateWithoutUserInputObjectSchema), z.lazy(() => PersonaAttributeCreateWithoutUserInputObjectSchema).array(), z.lazy(() => PersonaAttributeUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => PersonaAttributeUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PersonaAttributeCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => PersonaAttributeCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => PersonaAttributeUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => PersonaAttributeUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PersonaAttributeCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => PersonaAttributeWhereUniqueInputObjectSchema), z.lazy(() => PersonaAttributeWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => PersonaAttributeWhereUniqueInputObjectSchema), z.lazy(() => PersonaAttributeWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => PersonaAttributeWhereUniqueInputObjectSchema), z.lazy(() => PersonaAttributeWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => PersonaAttributeWhereUniqueInputObjectSchema), z.lazy(() => PersonaAttributeWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => PersonaAttributeUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => PersonaAttributeUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => PersonaAttributeUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => PersonaAttributeUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => PersonaAttributeScalarWhereInputObjectSchema), z.lazy(() => PersonaAttributeScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const PersonaAttributeUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.PersonaAttributeUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaAttributeUpdateManyWithoutUserNestedInput>;
export const PersonaAttributeUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
