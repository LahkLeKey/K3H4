import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OsrmCacheEntryWhereUniqueInputObjectSchema as OsrmCacheEntryWhereUniqueInputObjectSchema } from './OsrmCacheEntryWhereUniqueInput.schema';
import { OsrmCacheEntryUpdateWithoutActorInputObjectSchema as OsrmCacheEntryUpdateWithoutActorInputObjectSchema } from './OsrmCacheEntryUpdateWithoutActorInput.schema';
import { OsrmCacheEntryUncheckedUpdateWithoutActorInputObjectSchema as OsrmCacheEntryUncheckedUpdateWithoutActorInputObjectSchema } from './OsrmCacheEntryUncheckedUpdateWithoutActorInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OsrmCacheEntryWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => OsrmCacheEntryUpdateWithoutActorInputObjectSchema), z.lazy(() => OsrmCacheEntryUncheckedUpdateWithoutActorInputObjectSchema)])
}).strict();
export const OsrmCacheEntryUpdateWithWhereUniqueWithoutActorInputObjectSchema: z.ZodType<Prisma.OsrmCacheEntryUpdateWithWhereUniqueWithoutActorInput> = makeSchema() as unknown as z.ZodType<Prisma.OsrmCacheEntryUpdateWithWhereUniqueWithoutActorInput>;
export const OsrmCacheEntryUpdateWithWhereUniqueWithoutActorInputObjectZodSchema = makeSchema();
