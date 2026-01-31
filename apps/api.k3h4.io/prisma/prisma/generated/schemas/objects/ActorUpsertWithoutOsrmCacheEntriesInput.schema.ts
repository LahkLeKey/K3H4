import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorUpdateWithoutOsrmCacheEntriesInputObjectSchema as ActorUpdateWithoutOsrmCacheEntriesInputObjectSchema } from './ActorUpdateWithoutOsrmCacheEntriesInput.schema';
import { ActorUncheckedUpdateWithoutOsrmCacheEntriesInputObjectSchema as ActorUncheckedUpdateWithoutOsrmCacheEntriesInputObjectSchema } from './ActorUncheckedUpdateWithoutOsrmCacheEntriesInput.schema';
import { ActorCreateWithoutOsrmCacheEntriesInputObjectSchema as ActorCreateWithoutOsrmCacheEntriesInputObjectSchema } from './ActorCreateWithoutOsrmCacheEntriesInput.schema';
import { ActorUncheckedCreateWithoutOsrmCacheEntriesInputObjectSchema as ActorUncheckedCreateWithoutOsrmCacheEntriesInputObjectSchema } from './ActorUncheckedCreateWithoutOsrmCacheEntriesInput.schema';
import { ActorWhereInputObjectSchema as ActorWhereInputObjectSchema } from './ActorWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => ActorUpdateWithoutOsrmCacheEntriesInputObjectSchema), z.lazy(() => ActorUncheckedUpdateWithoutOsrmCacheEntriesInputObjectSchema)]),
  create: z.union([z.lazy(() => ActorCreateWithoutOsrmCacheEntriesInputObjectSchema), z.lazy(() => ActorUncheckedCreateWithoutOsrmCacheEntriesInputObjectSchema)]),
  where: z.lazy(() => ActorWhereInputObjectSchema).optional()
}).strict();
export const ActorUpsertWithoutOsrmCacheEntriesInputObjectSchema: z.ZodType<Prisma.ActorUpsertWithoutOsrmCacheEntriesInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorUpsertWithoutOsrmCacheEntriesInput>;
export const ActorUpsertWithoutOsrmCacheEntriesInputObjectZodSchema = makeSchema();
