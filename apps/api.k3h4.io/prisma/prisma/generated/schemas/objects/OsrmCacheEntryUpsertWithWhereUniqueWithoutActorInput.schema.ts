import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OsrmCacheEntryWhereUniqueInputObjectSchema as OsrmCacheEntryWhereUniqueInputObjectSchema } from './OsrmCacheEntryWhereUniqueInput.schema';
import { OsrmCacheEntryUpdateWithoutActorInputObjectSchema as OsrmCacheEntryUpdateWithoutActorInputObjectSchema } from './OsrmCacheEntryUpdateWithoutActorInput.schema';
import { OsrmCacheEntryUncheckedUpdateWithoutActorInputObjectSchema as OsrmCacheEntryUncheckedUpdateWithoutActorInputObjectSchema } from './OsrmCacheEntryUncheckedUpdateWithoutActorInput.schema';
import { OsrmCacheEntryCreateWithoutActorInputObjectSchema as OsrmCacheEntryCreateWithoutActorInputObjectSchema } from './OsrmCacheEntryCreateWithoutActorInput.schema';
import { OsrmCacheEntryUncheckedCreateWithoutActorInputObjectSchema as OsrmCacheEntryUncheckedCreateWithoutActorInputObjectSchema } from './OsrmCacheEntryUncheckedCreateWithoutActorInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OsrmCacheEntryWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => OsrmCacheEntryUpdateWithoutActorInputObjectSchema), z.lazy(() => OsrmCacheEntryUncheckedUpdateWithoutActorInputObjectSchema)]),
  create: z.union([z.lazy(() => OsrmCacheEntryCreateWithoutActorInputObjectSchema), z.lazy(() => OsrmCacheEntryUncheckedCreateWithoutActorInputObjectSchema)])
}).strict();
export const OsrmCacheEntryUpsertWithWhereUniqueWithoutActorInputObjectSchema: z.ZodType<Prisma.OsrmCacheEntryUpsertWithWhereUniqueWithoutActorInput> = makeSchema() as unknown as z.ZodType<Prisma.OsrmCacheEntryUpsertWithWhereUniqueWithoutActorInput>;
export const OsrmCacheEntryUpsertWithWhereUniqueWithoutActorInputObjectZodSchema = makeSchema();
