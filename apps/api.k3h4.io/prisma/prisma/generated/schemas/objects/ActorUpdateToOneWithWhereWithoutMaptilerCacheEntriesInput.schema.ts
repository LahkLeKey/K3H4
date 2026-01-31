import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorWhereInputObjectSchema as ActorWhereInputObjectSchema } from './ActorWhereInput.schema';
import { ActorUpdateWithoutMaptilerCacheEntriesInputObjectSchema as ActorUpdateWithoutMaptilerCacheEntriesInputObjectSchema } from './ActorUpdateWithoutMaptilerCacheEntriesInput.schema';
import { ActorUncheckedUpdateWithoutMaptilerCacheEntriesInputObjectSchema as ActorUncheckedUpdateWithoutMaptilerCacheEntriesInputObjectSchema } from './ActorUncheckedUpdateWithoutMaptilerCacheEntriesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ActorWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ActorUpdateWithoutMaptilerCacheEntriesInputObjectSchema), z.lazy(() => ActorUncheckedUpdateWithoutMaptilerCacheEntriesInputObjectSchema)])
}).strict();
export const ActorUpdateToOneWithWhereWithoutMaptilerCacheEntriesInputObjectSchema: z.ZodType<Prisma.ActorUpdateToOneWithWhereWithoutMaptilerCacheEntriesInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorUpdateToOneWithWhereWithoutMaptilerCacheEntriesInput>;
export const ActorUpdateToOneWithWhereWithoutMaptilerCacheEntriesInputObjectZodSchema = makeSchema();
