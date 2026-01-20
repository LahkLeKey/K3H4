import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerCacheEntryWhereUniqueInputObjectSchema as MaptilerCacheEntryWhereUniqueInputObjectSchema } from './MaptilerCacheEntryWhereUniqueInput.schema';
import { MaptilerCacheEntryUpdateWithoutQueryInputObjectSchema as MaptilerCacheEntryUpdateWithoutQueryInputObjectSchema } from './MaptilerCacheEntryUpdateWithoutQueryInput.schema';
import { MaptilerCacheEntryUncheckedUpdateWithoutQueryInputObjectSchema as MaptilerCacheEntryUncheckedUpdateWithoutQueryInputObjectSchema } from './MaptilerCacheEntryUncheckedUpdateWithoutQueryInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MaptilerCacheEntryWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => MaptilerCacheEntryUpdateWithoutQueryInputObjectSchema), z.lazy(() => MaptilerCacheEntryUncheckedUpdateWithoutQueryInputObjectSchema)])
}).strict();
export const MaptilerCacheEntryUpdateWithWhereUniqueWithoutQueryInputObjectSchema: z.ZodType<Prisma.MaptilerCacheEntryUpdateWithWhereUniqueWithoutQueryInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerCacheEntryUpdateWithWhereUniqueWithoutQueryInput>;
export const MaptilerCacheEntryUpdateWithWhereUniqueWithoutQueryInputObjectZodSchema = makeSchema();
