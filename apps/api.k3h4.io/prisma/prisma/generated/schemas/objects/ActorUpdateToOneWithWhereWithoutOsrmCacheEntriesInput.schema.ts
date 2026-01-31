import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorWhereInputObjectSchema as ActorWhereInputObjectSchema } from './ActorWhereInput.schema';
import { ActorUpdateWithoutOsrmCacheEntriesInputObjectSchema as ActorUpdateWithoutOsrmCacheEntriesInputObjectSchema } from './ActorUpdateWithoutOsrmCacheEntriesInput.schema';
import { ActorUncheckedUpdateWithoutOsrmCacheEntriesInputObjectSchema as ActorUncheckedUpdateWithoutOsrmCacheEntriesInputObjectSchema } from './ActorUncheckedUpdateWithoutOsrmCacheEntriesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ActorWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ActorUpdateWithoutOsrmCacheEntriesInputObjectSchema), z.lazy(() => ActorUncheckedUpdateWithoutOsrmCacheEntriesInputObjectSchema)])
}).strict();
export const ActorUpdateToOneWithWhereWithoutOsrmCacheEntriesInputObjectSchema: z.ZodType<Prisma.ActorUpdateToOneWithWhereWithoutOsrmCacheEntriesInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorUpdateToOneWithWhereWithoutOsrmCacheEntriesInput>;
export const ActorUpdateToOneWithWhereWithoutOsrmCacheEntriesInputObjectZodSchema = makeSchema();
