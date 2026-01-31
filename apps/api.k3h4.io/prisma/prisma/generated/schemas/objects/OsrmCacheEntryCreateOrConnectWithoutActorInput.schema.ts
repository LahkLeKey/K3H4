import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OsrmCacheEntryWhereUniqueInputObjectSchema as OsrmCacheEntryWhereUniqueInputObjectSchema } from './OsrmCacheEntryWhereUniqueInput.schema';
import { OsrmCacheEntryCreateWithoutActorInputObjectSchema as OsrmCacheEntryCreateWithoutActorInputObjectSchema } from './OsrmCacheEntryCreateWithoutActorInput.schema';
import { OsrmCacheEntryUncheckedCreateWithoutActorInputObjectSchema as OsrmCacheEntryUncheckedCreateWithoutActorInputObjectSchema } from './OsrmCacheEntryUncheckedCreateWithoutActorInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OsrmCacheEntryWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => OsrmCacheEntryCreateWithoutActorInputObjectSchema), z.lazy(() => OsrmCacheEntryUncheckedCreateWithoutActorInputObjectSchema)])
}).strict();
export const OsrmCacheEntryCreateOrConnectWithoutActorInputObjectSchema: z.ZodType<Prisma.OsrmCacheEntryCreateOrConnectWithoutActorInput> = makeSchema() as unknown as z.ZodType<Prisma.OsrmCacheEntryCreateOrConnectWithoutActorInput>;
export const OsrmCacheEntryCreateOrConnectWithoutActorInputObjectZodSchema = makeSchema();
