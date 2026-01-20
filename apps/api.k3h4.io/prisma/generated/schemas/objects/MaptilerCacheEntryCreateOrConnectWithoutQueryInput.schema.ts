import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerCacheEntryWhereUniqueInputObjectSchema as MaptilerCacheEntryWhereUniqueInputObjectSchema } from './MaptilerCacheEntryWhereUniqueInput.schema';
import { MaptilerCacheEntryCreateWithoutQueryInputObjectSchema as MaptilerCacheEntryCreateWithoutQueryInputObjectSchema } from './MaptilerCacheEntryCreateWithoutQueryInput.schema';
import { MaptilerCacheEntryUncheckedCreateWithoutQueryInputObjectSchema as MaptilerCacheEntryUncheckedCreateWithoutQueryInputObjectSchema } from './MaptilerCacheEntryUncheckedCreateWithoutQueryInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MaptilerCacheEntryWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => MaptilerCacheEntryCreateWithoutQueryInputObjectSchema), z.lazy(() => MaptilerCacheEntryUncheckedCreateWithoutQueryInputObjectSchema)])
}).strict();
export const MaptilerCacheEntryCreateOrConnectWithoutQueryInputObjectSchema: z.ZodType<Prisma.MaptilerCacheEntryCreateOrConnectWithoutQueryInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerCacheEntryCreateOrConnectWithoutQueryInput>;
export const MaptilerCacheEntryCreateOrConnectWithoutQueryInputObjectZodSchema = makeSchema();
