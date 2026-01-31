import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorCreateWithoutOsrmCacheEntriesInputObjectSchema as ActorCreateWithoutOsrmCacheEntriesInputObjectSchema } from './ActorCreateWithoutOsrmCacheEntriesInput.schema';
import { ActorUncheckedCreateWithoutOsrmCacheEntriesInputObjectSchema as ActorUncheckedCreateWithoutOsrmCacheEntriesInputObjectSchema } from './ActorUncheckedCreateWithoutOsrmCacheEntriesInput.schema';
import { ActorCreateOrConnectWithoutOsrmCacheEntriesInputObjectSchema as ActorCreateOrConnectWithoutOsrmCacheEntriesInputObjectSchema } from './ActorCreateOrConnectWithoutOsrmCacheEntriesInput.schema';
import { ActorUpsertWithoutOsrmCacheEntriesInputObjectSchema as ActorUpsertWithoutOsrmCacheEntriesInputObjectSchema } from './ActorUpsertWithoutOsrmCacheEntriesInput.schema';
import { ActorWhereInputObjectSchema as ActorWhereInputObjectSchema } from './ActorWhereInput.schema';
import { ActorWhereUniqueInputObjectSchema as ActorWhereUniqueInputObjectSchema } from './ActorWhereUniqueInput.schema';
import { ActorUpdateToOneWithWhereWithoutOsrmCacheEntriesInputObjectSchema as ActorUpdateToOneWithWhereWithoutOsrmCacheEntriesInputObjectSchema } from './ActorUpdateToOneWithWhereWithoutOsrmCacheEntriesInput.schema';
import { ActorUpdateWithoutOsrmCacheEntriesInputObjectSchema as ActorUpdateWithoutOsrmCacheEntriesInputObjectSchema } from './ActorUpdateWithoutOsrmCacheEntriesInput.schema';
import { ActorUncheckedUpdateWithoutOsrmCacheEntriesInputObjectSchema as ActorUncheckedUpdateWithoutOsrmCacheEntriesInputObjectSchema } from './ActorUncheckedUpdateWithoutOsrmCacheEntriesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ActorCreateWithoutOsrmCacheEntriesInputObjectSchema), z.lazy(() => ActorUncheckedCreateWithoutOsrmCacheEntriesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ActorCreateOrConnectWithoutOsrmCacheEntriesInputObjectSchema).optional(),
  upsert: z.lazy(() => ActorUpsertWithoutOsrmCacheEntriesInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => ActorWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => ActorWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => ActorWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ActorUpdateToOneWithWhereWithoutOsrmCacheEntriesInputObjectSchema), z.lazy(() => ActorUpdateWithoutOsrmCacheEntriesInputObjectSchema), z.lazy(() => ActorUncheckedUpdateWithoutOsrmCacheEntriesInputObjectSchema)]).optional()
}).strict();
export const ActorUpdateOneWithoutOsrmCacheEntriesNestedInputObjectSchema: z.ZodType<Prisma.ActorUpdateOneWithoutOsrmCacheEntriesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorUpdateOneWithoutOsrmCacheEntriesNestedInput>;
export const ActorUpdateOneWithoutOsrmCacheEntriesNestedInputObjectZodSchema = makeSchema();
