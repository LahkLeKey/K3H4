import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCompatibilityCreateWithoutUserInputObjectSchema as PersonaCompatibilityCreateWithoutUserInputObjectSchema } from './PersonaCompatibilityCreateWithoutUserInput.schema';
import { PersonaCompatibilityUncheckedCreateWithoutUserInputObjectSchema as PersonaCompatibilityUncheckedCreateWithoutUserInputObjectSchema } from './PersonaCompatibilityUncheckedCreateWithoutUserInput.schema';
import { PersonaCompatibilityCreateOrConnectWithoutUserInputObjectSchema as PersonaCompatibilityCreateOrConnectWithoutUserInputObjectSchema } from './PersonaCompatibilityCreateOrConnectWithoutUserInput.schema';
import { PersonaCompatibilityUpsertWithWhereUniqueWithoutUserInputObjectSchema as PersonaCompatibilityUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './PersonaCompatibilityUpsertWithWhereUniqueWithoutUserInput.schema';
import { PersonaCompatibilityCreateManyUserInputEnvelopeObjectSchema as PersonaCompatibilityCreateManyUserInputEnvelopeObjectSchema } from './PersonaCompatibilityCreateManyUserInputEnvelope.schema';
import { PersonaCompatibilityWhereUniqueInputObjectSchema as PersonaCompatibilityWhereUniqueInputObjectSchema } from './PersonaCompatibilityWhereUniqueInput.schema';
import { PersonaCompatibilityUpdateWithWhereUniqueWithoutUserInputObjectSchema as PersonaCompatibilityUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './PersonaCompatibilityUpdateWithWhereUniqueWithoutUserInput.schema';
import { PersonaCompatibilityUpdateManyWithWhereWithoutUserInputObjectSchema as PersonaCompatibilityUpdateManyWithWhereWithoutUserInputObjectSchema } from './PersonaCompatibilityUpdateManyWithWhereWithoutUserInput.schema';
import { PersonaCompatibilityScalarWhereInputObjectSchema as PersonaCompatibilityScalarWhereInputObjectSchema } from './PersonaCompatibilityScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PersonaCompatibilityCreateWithoutUserInputObjectSchema), z.lazy(() => PersonaCompatibilityCreateWithoutUserInputObjectSchema).array(), z.lazy(() => PersonaCompatibilityUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => PersonaCompatibilityUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PersonaCompatibilityCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => PersonaCompatibilityCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => PersonaCompatibilityUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => PersonaCompatibilityUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PersonaCompatibilityCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => PersonaCompatibilityWhereUniqueInputObjectSchema), z.lazy(() => PersonaCompatibilityWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => PersonaCompatibilityWhereUniqueInputObjectSchema), z.lazy(() => PersonaCompatibilityWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => PersonaCompatibilityWhereUniqueInputObjectSchema), z.lazy(() => PersonaCompatibilityWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => PersonaCompatibilityWhereUniqueInputObjectSchema), z.lazy(() => PersonaCompatibilityWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => PersonaCompatibilityUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => PersonaCompatibilityUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => PersonaCompatibilityUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => PersonaCompatibilityUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => PersonaCompatibilityScalarWhereInputObjectSchema), z.lazy(() => PersonaCompatibilityScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const PersonaCompatibilityUncheckedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.PersonaCompatibilityUncheckedUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCompatibilityUncheckedUpdateManyWithoutUserNestedInput>;
export const PersonaCompatibilityUncheckedUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
