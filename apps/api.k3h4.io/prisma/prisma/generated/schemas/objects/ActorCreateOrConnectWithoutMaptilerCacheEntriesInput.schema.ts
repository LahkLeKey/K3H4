import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorWhereUniqueInputObjectSchema as ActorWhereUniqueInputObjectSchema } from './ActorWhereUniqueInput.schema';
import { ActorCreateWithoutMaptilerCacheEntriesInputObjectSchema as ActorCreateWithoutMaptilerCacheEntriesInputObjectSchema } from './ActorCreateWithoutMaptilerCacheEntriesInput.schema';
import { ActorUncheckedCreateWithoutMaptilerCacheEntriesInputObjectSchema as ActorUncheckedCreateWithoutMaptilerCacheEntriesInputObjectSchema } from './ActorUncheckedCreateWithoutMaptilerCacheEntriesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ActorWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ActorCreateWithoutMaptilerCacheEntriesInputObjectSchema), z.lazy(() => ActorUncheckedCreateWithoutMaptilerCacheEntriesInputObjectSchema)])
}).strict();
export const ActorCreateOrConnectWithoutMaptilerCacheEntriesInputObjectSchema: z.ZodType<Prisma.ActorCreateOrConnectWithoutMaptilerCacheEntriesInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorCreateOrConnectWithoutMaptilerCacheEntriesInput>;
export const ActorCreateOrConnectWithoutMaptilerCacheEntriesInputObjectZodSchema = makeSchema();
