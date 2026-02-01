import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorCacheCreateWithoutActorInputObjectSchema as ActorCacheCreateWithoutActorInputObjectSchema } from './ActorCacheCreateWithoutActorInput.schema';
import { ActorCacheUncheckedCreateWithoutActorInputObjectSchema as ActorCacheUncheckedCreateWithoutActorInputObjectSchema } from './ActorCacheUncheckedCreateWithoutActorInput.schema';
import { ActorCacheCreateOrConnectWithoutActorInputObjectSchema as ActorCacheCreateOrConnectWithoutActorInputObjectSchema } from './ActorCacheCreateOrConnectWithoutActorInput.schema';
import { ActorCacheCreateManyActorInputEnvelopeObjectSchema as ActorCacheCreateManyActorInputEnvelopeObjectSchema } from './ActorCacheCreateManyActorInputEnvelope.schema';
import { ActorCacheWhereUniqueInputObjectSchema as ActorCacheWhereUniqueInputObjectSchema } from './ActorCacheWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ActorCacheCreateWithoutActorInputObjectSchema), z.lazy(() => ActorCacheCreateWithoutActorInputObjectSchema).array(), z.lazy(() => ActorCacheUncheckedCreateWithoutActorInputObjectSchema), z.lazy(() => ActorCacheUncheckedCreateWithoutActorInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ActorCacheCreateOrConnectWithoutActorInputObjectSchema), z.lazy(() => ActorCacheCreateOrConnectWithoutActorInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ActorCacheCreateManyActorInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ActorCacheWhereUniqueInputObjectSchema), z.lazy(() => ActorCacheWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ActorCacheUncheckedCreateNestedManyWithoutActorInputObjectSchema: z.ZodType<Prisma.ActorCacheUncheckedCreateNestedManyWithoutActorInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorCacheUncheckedCreateNestedManyWithoutActorInput>;
export const ActorCacheUncheckedCreateNestedManyWithoutActorInputObjectZodSchema = makeSchema();
