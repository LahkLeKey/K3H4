import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorUpdateWithoutMaptilerCacheEntriesInputObjectSchema as ActorUpdateWithoutMaptilerCacheEntriesInputObjectSchema } from './ActorUpdateWithoutMaptilerCacheEntriesInput.schema';
import { ActorUncheckedUpdateWithoutMaptilerCacheEntriesInputObjectSchema as ActorUncheckedUpdateWithoutMaptilerCacheEntriesInputObjectSchema } from './ActorUncheckedUpdateWithoutMaptilerCacheEntriesInput.schema';
import { ActorCreateWithoutMaptilerCacheEntriesInputObjectSchema as ActorCreateWithoutMaptilerCacheEntriesInputObjectSchema } from './ActorCreateWithoutMaptilerCacheEntriesInput.schema';
import { ActorUncheckedCreateWithoutMaptilerCacheEntriesInputObjectSchema as ActorUncheckedCreateWithoutMaptilerCacheEntriesInputObjectSchema } from './ActorUncheckedCreateWithoutMaptilerCacheEntriesInput.schema';
import { ActorWhereInputObjectSchema as ActorWhereInputObjectSchema } from './ActorWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => ActorUpdateWithoutMaptilerCacheEntriesInputObjectSchema), z.lazy(() => ActorUncheckedUpdateWithoutMaptilerCacheEntriesInputObjectSchema)]),
  create: z.union([z.lazy(() => ActorCreateWithoutMaptilerCacheEntriesInputObjectSchema), z.lazy(() => ActorUncheckedCreateWithoutMaptilerCacheEntriesInputObjectSchema)]),
  where: z.lazy(() => ActorWhereInputObjectSchema).optional()
}).strict();
export const ActorUpsertWithoutMaptilerCacheEntriesInputObjectSchema: z.ZodType<Prisma.ActorUpsertWithoutMaptilerCacheEntriesInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorUpsertWithoutMaptilerCacheEntriesInput>;
export const ActorUpsertWithoutMaptilerCacheEntriesInputObjectZodSchema = makeSchema();
