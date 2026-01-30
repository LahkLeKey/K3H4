import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorCacheWhereUniqueInputObjectSchema as ActorCacheWhereUniqueInputObjectSchema } from './ActorCacheWhereUniqueInput.schema';
import { ActorCacheUpdateWithoutActorInputObjectSchema as ActorCacheUpdateWithoutActorInputObjectSchema } from './ActorCacheUpdateWithoutActorInput.schema';
import { ActorCacheUncheckedUpdateWithoutActorInputObjectSchema as ActorCacheUncheckedUpdateWithoutActorInputObjectSchema } from './ActorCacheUncheckedUpdateWithoutActorInput.schema';
import { ActorCacheCreateWithoutActorInputObjectSchema as ActorCacheCreateWithoutActorInputObjectSchema } from './ActorCacheCreateWithoutActorInput.schema';
import { ActorCacheUncheckedCreateWithoutActorInputObjectSchema as ActorCacheUncheckedCreateWithoutActorInputObjectSchema } from './ActorCacheUncheckedCreateWithoutActorInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ActorCacheWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ActorCacheUpdateWithoutActorInputObjectSchema), z.lazy(() => ActorCacheUncheckedUpdateWithoutActorInputObjectSchema)]),
  create: z.union([z.lazy(() => ActorCacheCreateWithoutActorInputObjectSchema), z.lazy(() => ActorCacheUncheckedCreateWithoutActorInputObjectSchema)])
}).strict();
export const ActorCacheUpsertWithWhereUniqueWithoutActorInputObjectSchema: z.ZodType<Prisma.ActorCacheUpsertWithWhereUniqueWithoutActorInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorCacheUpsertWithWhereUniqueWithoutActorInput>;
export const ActorCacheUpsertWithWhereUniqueWithoutActorInputObjectZodSchema = makeSchema();
