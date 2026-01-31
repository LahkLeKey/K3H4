import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerCacheEntryWhereUniqueInputObjectSchema as MaptilerCacheEntryWhereUniqueInputObjectSchema } from './MaptilerCacheEntryWhereUniqueInput.schema';
import { MaptilerCacheEntryCreateWithoutActorInputObjectSchema as MaptilerCacheEntryCreateWithoutActorInputObjectSchema } from './MaptilerCacheEntryCreateWithoutActorInput.schema';
import { MaptilerCacheEntryUncheckedCreateWithoutActorInputObjectSchema as MaptilerCacheEntryUncheckedCreateWithoutActorInputObjectSchema } from './MaptilerCacheEntryUncheckedCreateWithoutActorInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MaptilerCacheEntryWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => MaptilerCacheEntryCreateWithoutActorInputObjectSchema), z.lazy(() => MaptilerCacheEntryUncheckedCreateWithoutActorInputObjectSchema)])
}).strict();
export const MaptilerCacheEntryCreateOrConnectWithoutActorInputObjectSchema: z.ZodType<Prisma.MaptilerCacheEntryCreateOrConnectWithoutActorInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerCacheEntryCreateOrConnectWithoutActorInput>;
export const MaptilerCacheEntryCreateOrConnectWithoutActorInputObjectZodSchema = makeSchema();
