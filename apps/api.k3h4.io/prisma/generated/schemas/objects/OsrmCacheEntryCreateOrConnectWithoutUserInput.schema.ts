import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OsrmCacheEntryWhereUniqueInputObjectSchema as OsrmCacheEntryWhereUniqueInputObjectSchema } from './OsrmCacheEntryWhereUniqueInput.schema';
import { OsrmCacheEntryCreateWithoutUserInputObjectSchema as OsrmCacheEntryCreateWithoutUserInputObjectSchema } from './OsrmCacheEntryCreateWithoutUserInput.schema';
import { OsrmCacheEntryUncheckedCreateWithoutUserInputObjectSchema as OsrmCacheEntryUncheckedCreateWithoutUserInputObjectSchema } from './OsrmCacheEntryUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OsrmCacheEntryWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => OsrmCacheEntryCreateWithoutUserInputObjectSchema), z.lazy(() => OsrmCacheEntryUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const OsrmCacheEntryCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.OsrmCacheEntryCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.OsrmCacheEntryCreateOrConnectWithoutUserInput>;
export const OsrmCacheEntryCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
