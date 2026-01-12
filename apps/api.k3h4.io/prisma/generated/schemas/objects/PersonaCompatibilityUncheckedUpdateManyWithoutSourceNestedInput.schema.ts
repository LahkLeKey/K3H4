import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCompatibilityCreateWithoutSourceInputObjectSchema as PersonaCompatibilityCreateWithoutSourceInputObjectSchema } from './PersonaCompatibilityCreateWithoutSourceInput.schema';
import { PersonaCompatibilityUncheckedCreateWithoutSourceInputObjectSchema as PersonaCompatibilityUncheckedCreateWithoutSourceInputObjectSchema } from './PersonaCompatibilityUncheckedCreateWithoutSourceInput.schema';
import { PersonaCompatibilityCreateOrConnectWithoutSourceInputObjectSchema as PersonaCompatibilityCreateOrConnectWithoutSourceInputObjectSchema } from './PersonaCompatibilityCreateOrConnectWithoutSourceInput.schema';
import { PersonaCompatibilityUpsertWithWhereUniqueWithoutSourceInputObjectSchema as PersonaCompatibilityUpsertWithWhereUniqueWithoutSourceInputObjectSchema } from './PersonaCompatibilityUpsertWithWhereUniqueWithoutSourceInput.schema';
import { PersonaCompatibilityCreateManySourceInputEnvelopeObjectSchema as PersonaCompatibilityCreateManySourceInputEnvelopeObjectSchema } from './PersonaCompatibilityCreateManySourceInputEnvelope.schema';
import { PersonaCompatibilityWhereUniqueInputObjectSchema as PersonaCompatibilityWhereUniqueInputObjectSchema } from './PersonaCompatibilityWhereUniqueInput.schema';
import { PersonaCompatibilityUpdateWithWhereUniqueWithoutSourceInputObjectSchema as PersonaCompatibilityUpdateWithWhereUniqueWithoutSourceInputObjectSchema } from './PersonaCompatibilityUpdateWithWhereUniqueWithoutSourceInput.schema';
import { PersonaCompatibilityUpdateManyWithWhereWithoutSourceInputObjectSchema as PersonaCompatibilityUpdateManyWithWhereWithoutSourceInputObjectSchema } from './PersonaCompatibilityUpdateManyWithWhereWithoutSourceInput.schema';
import { PersonaCompatibilityScalarWhereInputObjectSchema as PersonaCompatibilityScalarWhereInputObjectSchema } from './PersonaCompatibilityScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PersonaCompatibilityCreateWithoutSourceInputObjectSchema), z.lazy(() => PersonaCompatibilityCreateWithoutSourceInputObjectSchema).array(), z.lazy(() => PersonaCompatibilityUncheckedCreateWithoutSourceInputObjectSchema), z.lazy(() => PersonaCompatibilityUncheckedCreateWithoutSourceInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PersonaCompatibilityCreateOrConnectWithoutSourceInputObjectSchema), z.lazy(() => PersonaCompatibilityCreateOrConnectWithoutSourceInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => PersonaCompatibilityUpsertWithWhereUniqueWithoutSourceInputObjectSchema), z.lazy(() => PersonaCompatibilityUpsertWithWhereUniqueWithoutSourceInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PersonaCompatibilityCreateManySourceInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => PersonaCompatibilityWhereUniqueInputObjectSchema), z.lazy(() => PersonaCompatibilityWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => PersonaCompatibilityWhereUniqueInputObjectSchema), z.lazy(() => PersonaCompatibilityWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => PersonaCompatibilityWhereUniqueInputObjectSchema), z.lazy(() => PersonaCompatibilityWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => PersonaCompatibilityWhereUniqueInputObjectSchema), z.lazy(() => PersonaCompatibilityWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => PersonaCompatibilityUpdateWithWhereUniqueWithoutSourceInputObjectSchema), z.lazy(() => PersonaCompatibilityUpdateWithWhereUniqueWithoutSourceInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => PersonaCompatibilityUpdateManyWithWhereWithoutSourceInputObjectSchema), z.lazy(() => PersonaCompatibilityUpdateManyWithWhereWithoutSourceInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => PersonaCompatibilityScalarWhereInputObjectSchema), z.lazy(() => PersonaCompatibilityScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const PersonaCompatibilityUncheckedUpdateManyWithoutSourceNestedInputObjectSchema: z.ZodType<Prisma.PersonaCompatibilityUncheckedUpdateManyWithoutSourceNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCompatibilityUncheckedUpdateManyWithoutSourceNestedInput>;
export const PersonaCompatibilityUncheckedUpdateManyWithoutSourceNestedInputObjectZodSchema = makeSchema();
