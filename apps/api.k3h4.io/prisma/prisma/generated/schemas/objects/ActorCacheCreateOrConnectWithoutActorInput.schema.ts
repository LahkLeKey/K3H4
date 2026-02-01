import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorCacheWhereUniqueInputObjectSchema as ActorCacheWhereUniqueInputObjectSchema } from './ActorCacheWhereUniqueInput.schema';
import { ActorCacheCreateWithoutActorInputObjectSchema as ActorCacheCreateWithoutActorInputObjectSchema } from './ActorCacheCreateWithoutActorInput.schema';
import { ActorCacheUncheckedCreateWithoutActorInputObjectSchema as ActorCacheUncheckedCreateWithoutActorInputObjectSchema } from './ActorCacheUncheckedCreateWithoutActorInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ActorCacheWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ActorCacheCreateWithoutActorInputObjectSchema), z.lazy(() => ActorCacheUncheckedCreateWithoutActorInputObjectSchema)])
}).strict();
export const ActorCacheCreateOrConnectWithoutActorInputObjectSchema: z.ZodType<Prisma.ActorCacheCreateOrConnectWithoutActorInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorCacheCreateOrConnectWithoutActorInput>;
export const ActorCacheCreateOrConnectWithoutActorInputObjectZodSchema = makeSchema();
