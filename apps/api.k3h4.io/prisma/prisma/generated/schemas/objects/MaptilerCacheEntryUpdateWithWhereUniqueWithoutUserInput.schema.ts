import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerCacheEntryWhereUniqueInputObjectSchema as MaptilerCacheEntryWhereUniqueInputObjectSchema } from './MaptilerCacheEntryWhereUniqueInput.schema';
import { MaptilerCacheEntryUpdateWithoutUserInputObjectSchema as MaptilerCacheEntryUpdateWithoutUserInputObjectSchema } from './MaptilerCacheEntryUpdateWithoutUserInput.schema';
import { MaptilerCacheEntryUncheckedUpdateWithoutUserInputObjectSchema as MaptilerCacheEntryUncheckedUpdateWithoutUserInputObjectSchema } from './MaptilerCacheEntryUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MaptilerCacheEntryWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => MaptilerCacheEntryUpdateWithoutUserInputObjectSchema), z.lazy(() => MaptilerCacheEntryUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const MaptilerCacheEntryUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.MaptilerCacheEntryUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerCacheEntryUpdateWithWhereUniqueWithoutUserInput>;
export const MaptilerCacheEntryUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
