import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OsrmCacheEntryWhereUniqueInputObjectSchema as OsrmCacheEntryWhereUniqueInputObjectSchema } from './OsrmCacheEntryWhereUniqueInput.schema';
import { OsrmCacheEntryUpdateWithoutUserInputObjectSchema as OsrmCacheEntryUpdateWithoutUserInputObjectSchema } from './OsrmCacheEntryUpdateWithoutUserInput.schema';
import { OsrmCacheEntryUncheckedUpdateWithoutUserInputObjectSchema as OsrmCacheEntryUncheckedUpdateWithoutUserInputObjectSchema } from './OsrmCacheEntryUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OsrmCacheEntryWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => OsrmCacheEntryUpdateWithoutUserInputObjectSchema), z.lazy(() => OsrmCacheEntryUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const OsrmCacheEntryUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.OsrmCacheEntryUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.OsrmCacheEntryUpdateWithWhereUniqueWithoutUserInput>;
export const OsrmCacheEntryUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
