import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorCreateWithoutMaptilerCacheEntriesInputObjectSchema as ActorCreateWithoutMaptilerCacheEntriesInputObjectSchema } from './ActorCreateWithoutMaptilerCacheEntriesInput.schema';
import { ActorUncheckedCreateWithoutMaptilerCacheEntriesInputObjectSchema as ActorUncheckedCreateWithoutMaptilerCacheEntriesInputObjectSchema } from './ActorUncheckedCreateWithoutMaptilerCacheEntriesInput.schema';
import { ActorCreateOrConnectWithoutMaptilerCacheEntriesInputObjectSchema as ActorCreateOrConnectWithoutMaptilerCacheEntriesInputObjectSchema } from './ActorCreateOrConnectWithoutMaptilerCacheEntriesInput.schema';
import { ActorWhereUniqueInputObjectSchema as ActorWhereUniqueInputObjectSchema } from './ActorWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ActorCreateWithoutMaptilerCacheEntriesInputObjectSchema), z.lazy(() => ActorUncheckedCreateWithoutMaptilerCacheEntriesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ActorCreateOrConnectWithoutMaptilerCacheEntriesInputObjectSchema).optional(),
  connect: z.lazy(() => ActorWhereUniqueInputObjectSchema).optional()
}).strict();
export const ActorCreateNestedOneWithoutMaptilerCacheEntriesInputObjectSchema: z.ZodType<Prisma.ActorCreateNestedOneWithoutMaptilerCacheEntriesInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorCreateNestedOneWithoutMaptilerCacheEntriesInput>;
export const ActorCreateNestedOneWithoutMaptilerCacheEntriesInputObjectZodSchema = makeSchema();
