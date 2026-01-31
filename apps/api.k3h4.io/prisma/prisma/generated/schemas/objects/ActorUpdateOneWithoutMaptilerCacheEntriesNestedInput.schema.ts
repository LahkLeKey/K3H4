import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorCreateWithoutMaptilerCacheEntriesInputObjectSchema as ActorCreateWithoutMaptilerCacheEntriesInputObjectSchema } from './ActorCreateWithoutMaptilerCacheEntriesInput.schema';
import { ActorUncheckedCreateWithoutMaptilerCacheEntriesInputObjectSchema as ActorUncheckedCreateWithoutMaptilerCacheEntriesInputObjectSchema } from './ActorUncheckedCreateWithoutMaptilerCacheEntriesInput.schema';
import { ActorCreateOrConnectWithoutMaptilerCacheEntriesInputObjectSchema as ActorCreateOrConnectWithoutMaptilerCacheEntriesInputObjectSchema } from './ActorCreateOrConnectWithoutMaptilerCacheEntriesInput.schema';
import { ActorUpsertWithoutMaptilerCacheEntriesInputObjectSchema as ActorUpsertWithoutMaptilerCacheEntriesInputObjectSchema } from './ActorUpsertWithoutMaptilerCacheEntriesInput.schema';
import { ActorWhereInputObjectSchema as ActorWhereInputObjectSchema } from './ActorWhereInput.schema';
import { ActorWhereUniqueInputObjectSchema as ActorWhereUniqueInputObjectSchema } from './ActorWhereUniqueInput.schema';
import { ActorUpdateToOneWithWhereWithoutMaptilerCacheEntriesInputObjectSchema as ActorUpdateToOneWithWhereWithoutMaptilerCacheEntriesInputObjectSchema } from './ActorUpdateToOneWithWhereWithoutMaptilerCacheEntriesInput.schema';
import { ActorUpdateWithoutMaptilerCacheEntriesInputObjectSchema as ActorUpdateWithoutMaptilerCacheEntriesInputObjectSchema } from './ActorUpdateWithoutMaptilerCacheEntriesInput.schema';
import { ActorUncheckedUpdateWithoutMaptilerCacheEntriesInputObjectSchema as ActorUncheckedUpdateWithoutMaptilerCacheEntriesInputObjectSchema } from './ActorUncheckedUpdateWithoutMaptilerCacheEntriesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ActorCreateWithoutMaptilerCacheEntriesInputObjectSchema), z.lazy(() => ActorUncheckedCreateWithoutMaptilerCacheEntriesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ActorCreateOrConnectWithoutMaptilerCacheEntriesInputObjectSchema).optional(),
  upsert: z.lazy(() => ActorUpsertWithoutMaptilerCacheEntriesInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => ActorWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => ActorWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => ActorWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ActorUpdateToOneWithWhereWithoutMaptilerCacheEntriesInputObjectSchema), z.lazy(() => ActorUpdateWithoutMaptilerCacheEntriesInputObjectSchema), z.lazy(() => ActorUncheckedUpdateWithoutMaptilerCacheEntriesInputObjectSchema)]).optional()
}).strict();
export const ActorUpdateOneWithoutMaptilerCacheEntriesNestedInputObjectSchema: z.ZodType<Prisma.ActorUpdateOneWithoutMaptilerCacheEntriesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorUpdateOneWithoutMaptilerCacheEntriesNestedInput>;
export const ActorUpdateOneWithoutMaptilerCacheEntriesNestedInputObjectZodSchema = makeSchema();
