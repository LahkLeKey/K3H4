import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerCacheEntryWhereUniqueInputObjectSchema as MaptilerCacheEntryWhereUniqueInputObjectSchema } from './MaptilerCacheEntryWhereUniqueInput.schema';
import { MaptilerCacheEntryUpdateWithoutUserInputObjectSchema as MaptilerCacheEntryUpdateWithoutUserInputObjectSchema } from './MaptilerCacheEntryUpdateWithoutUserInput.schema';
import { MaptilerCacheEntryUncheckedUpdateWithoutUserInputObjectSchema as MaptilerCacheEntryUncheckedUpdateWithoutUserInputObjectSchema } from './MaptilerCacheEntryUncheckedUpdateWithoutUserInput.schema';
import { MaptilerCacheEntryCreateWithoutUserInputObjectSchema as MaptilerCacheEntryCreateWithoutUserInputObjectSchema } from './MaptilerCacheEntryCreateWithoutUserInput.schema';
import { MaptilerCacheEntryUncheckedCreateWithoutUserInputObjectSchema as MaptilerCacheEntryUncheckedCreateWithoutUserInputObjectSchema } from './MaptilerCacheEntryUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MaptilerCacheEntryWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => MaptilerCacheEntryUpdateWithoutUserInputObjectSchema), z.lazy(() => MaptilerCacheEntryUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => MaptilerCacheEntryCreateWithoutUserInputObjectSchema), z.lazy(() => MaptilerCacheEntryUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const MaptilerCacheEntryUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.MaptilerCacheEntryUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerCacheEntryUpsertWithWhereUniqueWithoutUserInput>;
export const MaptilerCacheEntryUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
