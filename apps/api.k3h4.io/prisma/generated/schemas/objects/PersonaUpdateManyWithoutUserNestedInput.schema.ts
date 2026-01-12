import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCreateWithoutUserInputObjectSchema as PersonaCreateWithoutUserInputObjectSchema } from './PersonaCreateWithoutUserInput.schema';
import { PersonaUncheckedCreateWithoutUserInputObjectSchema as PersonaUncheckedCreateWithoutUserInputObjectSchema } from './PersonaUncheckedCreateWithoutUserInput.schema';
import { PersonaCreateOrConnectWithoutUserInputObjectSchema as PersonaCreateOrConnectWithoutUserInputObjectSchema } from './PersonaCreateOrConnectWithoutUserInput.schema';
import { PersonaUpsertWithWhereUniqueWithoutUserInputObjectSchema as PersonaUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './PersonaUpsertWithWhereUniqueWithoutUserInput.schema';
import { PersonaCreateManyUserInputEnvelopeObjectSchema as PersonaCreateManyUserInputEnvelopeObjectSchema } from './PersonaCreateManyUserInputEnvelope.schema';
import { PersonaWhereUniqueInputObjectSchema as PersonaWhereUniqueInputObjectSchema } from './PersonaWhereUniqueInput.schema';
import { PersonaUpdateWithWhereUniqueWithoutUserInputObjectSchema as PersonaUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './PersonaUpdateWithWhereUniqueWithoutUserInput.schema';
import { PersonaUpdateManyWithWhereWithoutUserInputObjectSchema as PersonaUpdateManyWithWhereWithoutUserInputObjectSchema } from './PersonaUpdateManyWithWhereWithoutUserInput.schema';
import { PersonaScalarWhereInputObjectSchema as PersonaScalarWhereInputObjectSchema } from './PersonaScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PersonaCreateWithoutUserInputObjectSchema), z.lazy(() => PersonaCreateWithoutUserInputObjectSchema).array(), z.lazy(() => PersonaUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => PersonaUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PersonaCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => PersonaCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => PersonaUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => PersonaUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PersonaCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => PersonaWhereUniqueInputObjectSchema), z.lazy(() => PersonaWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => PersonaWhereUniqueInputObjectSchema), z.lazy(() => PersonaWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => PersonaWhereUniqueInputObjectSchema), z.lazy(() => PersonaWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => PersonaWhereUniqueInputObjectSchema), z.lazy(() => PersonaWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => PersonaUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => PersonaUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => PersonaUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => PersonaUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => PersonaScalarWhereInputObjectSchema), z.lazy(() => PersonaScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const PersonaUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.PersonaUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaUpdateManyWithoutUserNestedInput>;
export const PersonaUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
