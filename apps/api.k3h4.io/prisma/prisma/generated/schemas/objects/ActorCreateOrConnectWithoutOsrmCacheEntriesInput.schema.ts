import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorWhereUniqueInputObjectSchema as ActorWhereUniqueInputObjectSchema } from './ActorWhereUniqueInput.schema';
import { ActorCreateWithoutOsrmCacheEntriesInputObjectSchema as ActorCreateWithoutOsrmCacheEntriesInputObjectSchema } from './ActorCreateWithoutOsrmCacheEntriesInput.schema';
import { ActorUncheckedCreateWithoutOsrmCacheEntriesInputObjectSchema as ActorUncheckedCreateWithoutOsrmCacheEntriesInputObjectSchema } from './ActorUncheckedCreateWithoutOsrmCacheEntriesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ActorWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ActorCreateWithoutOsrmCacheEntriesInputObjectSchema), z.lazy(() => ActorUncheckedCreateWithoutOsrmCacheEntriesInputObjectSchema)])
}).strict();
export const ActorCreateOrConnectWithoutOsrmCacheEntriesInputObjectSchema: z.ZodType<Prisma.ActorCreateOrConnectWithoutOsrmCacheEntriesInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorCreateOrConnectWithoutOsrmCacheEntriesInput>;
export const ActorCreateOrConnectWithoutOsrmCacheEntriesInputObjectZodSchema = makeSchema();
