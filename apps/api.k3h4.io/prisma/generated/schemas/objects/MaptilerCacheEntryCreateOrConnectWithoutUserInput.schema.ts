import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerCacheEntryWhereUniqueInputObjectSchema as MaptilerCacheEntryWhereUniqueInputObjectSchema } from './MaptilerCacheEntryWhereUniqueInput.schema';
import { MaptilerCacheEntryCreateWithoutUserInputObjectSchema as MaptilerCacheEntryCreateWithoutUserInputObjectSchema } from './MaptilerCacheEntryCreateWithoutUserInput.schema';
import { MaptilerCacheEntryUncheckedCreateWithoutUserInputObjectSchema as MaptilerCacheEntryUncheckedCreateWithoutUserInputObjectSchema } from './MaptilerCacheEntryUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MaptilerCacheEntryWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => MaptilerCacheEntryCreateWithoutUserInputObjectSchema), z.lazy(() => MaptilerCacheEntryUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const MaptilerCacheEntryCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.MaptilerCacheEntryCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerCacheEntryCreateOrConnectWithoutUserInput>;
export const MaptilerCacheEntryCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
