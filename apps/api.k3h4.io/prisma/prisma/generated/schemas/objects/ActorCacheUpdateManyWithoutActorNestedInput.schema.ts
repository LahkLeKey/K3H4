import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorCacheCreateWithoutActorInputObjectSchema as ActorCacheCreateWithoutActorInputObjectSchema } from './ActorCacheCreateWithoutActorInput.schema';
import { ActorCacheUncheckedCreateWithoutActorInputObjectSchema as ActorCacheUncheckedCreateWithoutActorInputObjectSchema } from './ActorCacheUncheckedCreateWithoutActorInput.schema';
import { ActorCacheCreateOrConnectWithoutActorInputObjectSchema as ActorCacheCreateOrConnectWithoutActorInputObjectSchema } from './ActorCacheCreateOrConnectWithoutActorInput.schema';
import { ActorCacheUpsertWithWhereUniqueWithoutActorInputObjectSchema as ActorCacheUpsertWithWhereUniqueWithoutActorInputObjectSchema } from './ActorCacheUpsertWithWhereUniqueWithoutActorInput.schema';
import { ActorCacheCreateManyActorInputEnvelopeObjectSchema as ActorCacheCreateManyActorInputEnvelopeObjectSchema } from './ActorCacheCreateManyActorInputEnvelope.schema';
import { ActorCacheWhereUniqueInputObjectSchema as ActorCacheWhereUniqueInputObjectSchema } from './ActorCacheWhereUniqueInput.schema';
import { ActorCacheUpdateWithWhereUniqueWithoutActorInputObjectSchema as ActorCacheUpdateWithWhereUniqueWithoutActorInputObjectSchema } from './ActorCacheUpdateWithWhereUniqueWithoutActorInput.schema';
import { ActorCacheUpdateManyWithWhereWithoutActorInputObjectSchema as ActorCacheUpdateManyWithWhereWithoutActorInputObjectSchema } from './ActorCacheUpdateManyWithWhereWithoutActorInput.schema';
import { ActorCacheScalarWhereInputObjectSchema as ActorCacheScalarWhereInputObjectSchema } from './ActorCacheScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ActorCacheCreateWithoutActorInputObjectSchema), z.lazy(() => ActorCacheCreateWithoutActorInputObjectSchema).array(), z.lazy(() => ActorCacheUncheckedCreateWithoutActorInputObjectSchema), z.lazy(() => ActorCacheUncheckedCreateWithoutActorInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ActorCacheCreateOrConnectWithoutActorInputObjectSchema), z.lazy(() => ActorCacheCreateOrConnectWithoutActorInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ActorCacheUpsertWithWhereUniqueWithoutActorInputObjectSchema), z.lazy(() => ActorCacheUpsertWithWhereUniqueWithoutActorInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ActorCacheCreateManyActorInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ActorCacheWhereUniqueInputObjectSchema), z.lazy(() => ActorCacheWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ActorCacheWhereUniqueInputObjectSchema), z.lazy(() => ActorCacheWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ActorCacheWhereUniqueInputObjectSchema), z.lazy(() => ActorCacheWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ActorCacheWhereUniqueInputObjectSchema), z.lazy(() => ActorCacheWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ActorCacheUpdateWithWhereUniqueWithoutActorInputObjectSchema), z.lazy(() => ActorCacheUpdateWithWhereUniqueWithoutActorInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ActorCacheUpdateManyWithWhereWithoutActorInputObjectSchema), z.lazy(() => ActorCacheUpdateManyWithWhereWithoutActorInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ActorCacheScalarWhereInputObjectSchema), z.lazy(() => ActorCacheScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ActorCacheUpdateManyWithoutActorNestedInputObjectSchema: z.ZodType<Prisma.ActorCacheUpdateManyWithoutActorNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorCacheUpdateManyWithoutActorNestedInput>;
export const ActorCacheUpdateManyWithoutActorNestedInputObjectZodSchema = makeSchema();
