import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntityCreateWithoutActorInputObjectSchema as EntityCreateWithoutActorInputObjectSchema } from './EntityCreateWithoutActorInput.schema';
import { EntityUncheckedCreateWithoutActorInputObjectSchema as EntityUncheckedCreateWithoutActorInputObjectSchema } from './EntityUncheckedCreateWithoutActorInput.schema';
import { EntityCreateOrConnectWithoutActorInputObjectSchema as EntityCreateOrConnectWithoutActorInputObjectSchema } from './EntityCreateOrConnectWithoutActorInput.schema';
import { EntityUpsertWithWhereUniqueWithoutActorInputObjectSchema as EntityUpsertWithWhereUniqueWithoutActorInputObjectSchema } from './EntityUpsertWithWhereUniqueWithoutActorInput.schema';
import { EntityCreateManyActorInputEnvelopeObjectSchema as EntityCreateManyActorInputEnvelopeObjectSchema } from './EntityCreateManyActorInputEnvelope.schema';
import { EntityWhereUniqueInputObjectSchema as EntityWhereUniqueInputObjectSchema } from './EntityWhereUniqueInput.schema';
import { EntityUpdateWithWhereUniqueWithoutActorInputObjectSchema as EntityUpdateWithWhereUniqueWithoutActorInputObjectSchema } from './EntityUpdateWithWhereUniqueWithoutActorInput.schema';
import { EntityUpdateManyWithWhereWithoutActorInputObjectSchema as EntityUpdateManyWithWhereWithoutActorInputObjectSchema } from './EntityUpdateManyWithWhereWithoutActorInput.schema';
import { EntityScalarWhereInputObjectSchema as EntityScalarWhereInputObjectSchema } from './EntityScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => EntityCreateWithoutActorInputObjectSchema), z.lazy(() => EntityCreateWithoutActorInputObjectSchema).array(), z.lazy(() => EntityUncheckedCreateWithoutActorInputObjectSchema), z.lazy(() => EntityUncheckedCreateWithoutActorInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => EntityCreateOrConnectWithoutActorInputObjectSchema), z.lazy(() => EntityCreateOrConnectWithoutActorInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => EntityUpsertWithWhereUniqueWithoutActorInputObjectSchema), z.lazy(() => EntityUpsertWithWhereUniqueWithoutActorInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => EntityCreateManyActorInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => EntityWhereUniqueInputObjectSchema), z.lazy(() => EntityWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => EntityWhereUniqueInputObjectSchema), z.lazy(() => EntityWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => EntityWhereUniqueInputObjectSchema), z.lazy(() => EntityWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => EntityWhereUniqueInputObjectSchema), z.lazy(() => EntityWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => EntityUpdateWithWhereUniqueWithoutActorInputObjectSchema), z.lazy(() => EntityUpdateWithWhereUniqueWithoutActorInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => EntityUpdateManyWithWhereWithoutActorInputObjectSchema), z.lazy(() => EntityUpdateManyWithWhereWithoutActorInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => EntityScalarWhereInputObjectSchema), z.lazy(() => EntityScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const EntityUncheckedUpdateManyWithoutActorNestedInputObjectSchema: z.ZodType<Prisma.EntityUncheckedUpdateManyWithoutActorNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.EntityUncheckedUpdateManyWithoutActorNestedInput>;
export const EntityUncheckedUpdateManyWithoutActorNestedInputObjectZodSchema = makeSchema();
