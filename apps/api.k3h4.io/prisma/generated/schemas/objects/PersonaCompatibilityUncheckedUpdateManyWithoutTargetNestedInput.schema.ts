import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCompatibilityCreateWithoutTargetInputObjectSchema as PersonaCompatibilityCreateWithoutTargetInputObjectSchema } from './PersonaCompatibilityCreateWithoutTargetInput.schema';
import { PersonaCompatibilityUncheckedCreateWithoutTargetInputObjectSchema as PersonaCompatibilityUncheckedCreateWithoutTargetInputObjectSchema } from './PersonaCompatibilityUncheckedCreateWithoutTargetInput.schema';
import { PersonaCompatibilityCreateOrConnectWithoutTargetInputObjectSchema as PersonaCompatibilityCreateOrConnectWithoutTargetInputObjectSchema } from './PersonaCompatibilityCreateOrConnectWithoutTargetInput.schema';
import { PersonaCompatibilityUpsertWithWhereUniqueWithoutTargetInputObjectSchema as PersonaCompatibilityUpsertWithWhereUniqueWithoutTargetInputObjectSchema } from './PersonaCompatibilityUpsertWithWhereUniqueWithoutTargetInput.schema';
import { PersonaCompatibilityCreateManyTargetInputEnvelopeObjectSchema as PersonaCompatibilityCreateManyTargetInputEnvelopeObjectSchema } from './PersonaCompatibilityCreateManyTargetInputEnvelope.schema';
import { PersonaCompatibilityWhereUniqueInputObjectSchema as PersonaCompatibilityWhereUniqueInputObjectSchema } from './PersonaCompatibilityWhereUniqueInput.schema';
import { PersonaCompatibilityUpdateWithWhereUniqueWithoutTargetInputObjectSchema as PersonaCompatibilityUpdateWithWhereUniqueWithoutTargetInputObjectSchema } from './PersonaCompatibilityUpdateWithWhereUniqueWithoutTargetInput.schema';
import { PersonaCompatibilityUpdateManyWithWhereWithoutTargetInputObjectSchema as PersonaCompatibilityUpdateManyWithWhereWithoutTargetInputObjectSchema } from './PersonaCompatibilityUpdateManyWithWhereWithoutTargetInput.schema';
import { PersonaCompatibilityScalarWhereInputObjectSchema as PersonaCompatibilityScalarWhereInputObjectSchema } from './PersonaCompatibilityScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PersonaCompatibilityCreateWithoutTargetInputObjectSchema), z.lazy(() => PersonaCompatibilityCreateWithoutTargetInputObjectSchema).array(), z.lazy(() => PersonaCompatibilityUncheckedCreateWithoutTargetInputObjectSchema), z.lazy(() => PersonaCompatibilityUncheckedCreateWithoutTargetInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PersonaCompatibilityCreateOrConnectWithoutTargetInputObjectSchema), z.lazy(() => PersonaCompatibilityCreateOrConnectWithoutTargetInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => PersonaCompatibilityUpsertWithWhereUniqueWithoutTargetInputObjectSchema), z.lazy(() => PersonaCompatibilityUpsertWithWhereUniqueWithoutTargetInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PersonaCompatibilityCreateManyTargetInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => PersonaCompatibilityWhereUniqueInputObjectSchema), z.lazy(() => PersonaCompatibilityWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => PersonaCompatibilityWhereUniqueInputObjectSchema), z.lazy(() => PersonaCompatibilityWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => PersonaCompatibilityWhereUniqueInputObjectSchema), z.lazy(() => PersonaCompatibilityWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => PersonaCompatibilityWhereUniqueInputObjectSchema), z.lazy(() => PersonaCompatibilityWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => PersonaCompatibilityUpdateWithWhereUniqueWithoutTargetInputObjectSchema), z.lazy(() => PersonaCompatibilityUpdateWithWhereUniqueWithoutTargetInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => PersonaCompatibilityUpdateManyWithWhereWithoutTargetInputObjectSchema), z.lazy(() => PersonaCompatibilityUpdateManyWithWhereWithoutTargetInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => PersonaCompatibilityScalarWhereInputObjectSchema), z.lazy(() => PersonaCompatibilityScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const PersonaCompatibilityUncheckedUpdateManyWithoutTargetNestedInputObjectSchema: z.ZodType<Prisma.PersonaCompatibilityUncheckedUpdateManyWithoutTargetNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCompatibilityUncheckedUpdateManyWithoutTargetNestedInput>;
export const PersonaCompatibilityUncheckedUpdateManyWithoutTargetNestedInputObjectZodSchema = makeSchema();
