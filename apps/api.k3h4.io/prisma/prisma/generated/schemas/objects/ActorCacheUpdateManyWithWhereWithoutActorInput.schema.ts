import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorCacheScalarWhereInputObjectSchema as ActorCacheScalarWhereInputObjectSchema } from './ActorCacheScalarWhereInput.schema';
import { ActorCacheUpdateManyMutationInputObjectSchema as ActorCacheUpdateManyMutationInputObjectSchema } from './ActorCacheUpdateManyMutationInput.schema';
import { ActorCacheUncheckedUpdateManyWithoutActorInputObjectSchema as ActorCacheUncheckedUpdateManyWithoutActorInputObjectSchema } from './ActorCacheUncheckedUpdateManyWithoutActorInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ActorCacheScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ActorCacheUpdateManyMutationInputObjectSchema), z.lazy(() => ActorCacheUncheckedUpdateManyWithoutActorInputObjectSchema)])
}).strict();
export const ActorCacheUpdateManyWithWhereWithoutActorInputObjectSchema: z.ZodType<Prisma.ActorCacheUpdateManyWithWhereWithoutActorInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorCacheUpdateManyWithWhereWithoutActorInput>;
export const ActorCacheUpdateManyWithWhereWithoutActorInputObjectZodSchema = makeSchema();
