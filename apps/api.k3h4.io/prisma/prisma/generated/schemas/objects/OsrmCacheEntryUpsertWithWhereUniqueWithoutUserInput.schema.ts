import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OsrmCacheEntryWhereUniqueInputObjectSchema as OsrmCacheEntryWhereUniqueInputObjectSchema } from './OsrmCacheEntryWhereUniqueInput.schema';
import { OsrmCacheEntryUpdateWithoutUserInputObjectSchema as OsrmCacheEntryUpdateWithoutUserInputObjectSchema } from './OsrmCacheEntryUpdateWithoutUserInput.schema';
import { OsrmCacheEntryUncheckedUpdateWithoutUserInputObjectSchema as OsrmCacheEntryUncheckedUpdateWithoutUserInputObjectSchema } from './OsrmCacheEntryUncheckedUpdateWithoutUserInput.schema';
import { OsrmCacheEntryCreateWithoutUserInputObjectSchema as OsrmCacheEntryCreateWithoutUserInputObjectSchema } from './OsrmCacheEntryCreateWithoutUserInput.schema';
import { OsrmCacheEntryUncheckedCreateWithoutUserInputObjectSchema as OsrmCacheEntryUncheckedCreateWithoutUserInputObjectSchema } from './OsrmCacheEntryUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OsrmCacheEntryWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => OsrmCacheEntryUpdateWithoutUserInputObjectSchema), z.lazy(() => OsrmCacheEntryUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => OsrmCacheEntryCreateWithoutUserInputObjectSchema), z.lazy(() => OsrmCacheEntryUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const OsrmCacheEntryUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.OsrmCacheEntryUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.OsrmCacheEntryUpsertWithWhereUniqueWithoutUserInput>;
export const OsrmCacheEntryUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
