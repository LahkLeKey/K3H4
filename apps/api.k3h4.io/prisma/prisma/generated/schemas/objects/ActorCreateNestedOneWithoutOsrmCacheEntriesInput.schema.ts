import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorCreateWithoutOsrmCacheEntriesInputObjectSchema as ActorCreateWithoutOsrmCacheEntriesInputObjectSchema } from './ActorCreateWithoutOsrmCacheEntriesInput.schema';
import { ActorUncheckedCreateWithoutOsrmCacheEntriesInputObjectSchema as ActorUncheckedCreateWithoutOsrmCacheEntriesInputObjectSchema } from './ActorUncheckedCreateWithoutOsrmCacheEntriesInput.schema';
import { ActorCreateOrConnectWithoutOsrmCacheEntriesInputObjectSchema as ActorCreateOrConnectWithoutOsrmCacheEntriesInputObjectSchema } from './ActorCreateOrConnectWithoutOsrmCacheEntriesInput.schema';
import { ActorWhereUniqueInputObjectSchema as ActorWhereUniqueInputObjectSchema } from './ActorWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ActorCreateWithoutOsrmCacheEntriesInputObjectSchema), z.lazy(() => ActorUncheckedCreateWithoutOsrmCacheEntriesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ActorCreateOrConnectWithoutOsrmCacheEntriesInputObjectSchema).optional(),
  connect: z.lazy(() => ActorWhereUniqueInputObjectSchema).optional()
}).strict();
export const ActorCreateNestedOneWithoutOsrmCacheEntriesInputObjectSchema: z.ZodType<Prisma.ActorCreateNestedOneWithoutOsrmCacheEntriesInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorCreateNestedOneWithoutOsrmCacheEntriesInput>;
export const ActorCreateNestedOneWithoutOsrmCacheEntriesInputObjectZodSchema = makeSchema();
