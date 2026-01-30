import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorCacheWhereUniqueInputObjectSchema as ActorCacheWhereUniqueInputObjectSchema } from './ActorCacheWhereUniqueInput.schema';
import { ActorCacheUpdateWithoutActorInputObjectSchema as ActorCacheUpdateWithoutActorInputObjectSchema } from './ActorCacheUpdateWithoutActorInput.schema';
import { ActorCacheUncheckedUpdateWithoutActorInputObjectSchema as ActorCacheUncheckedUpdateWithoutActorInputObjectSchema } from './ActorCacheUncheckedUpdateWithoutActorInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ActorCacheWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ActorCacheUpdateWithoutActorInputObjectSchema), z.lazy(() => ActorCacheUncheckedUpdateWithoutActorInputObjectSchema)])
}).strict();
export const ActorCacheUpdateWithWhereUniqueWithoutActorInputObjectSchema: z.ZodType<Prisma.ActorCacheUpdateWithWhereUniqueWithoutActorInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorCacheUpdateWithWhereUniqueWithoutActorInput>;
export const ActorCacheUpdateWithWhereUniqueWithoutActorInputObjectZodSchema = makeSchema();
