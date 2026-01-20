import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerCacheEntryWhereUniqueInputObjectSchema as MaptilerCacheEntryWhereUniqueInputObjectSchema } from './MaptilerCacheEntryWhereUniqueInput.schema';
import { MaptilerCacheEntryUpdateWithoutQueryInputObjectSchema as MaptilerCacheEntryUpdateWithoutQueryInputObjectSchema } from './MaptilerCacheEntryUpdateWithoutQueryInput.schema';
import { MaptilerCacheEntryUncheckedUpdateWithoutQueryInputObjectSchema as MaptilerCacheEntryUncheckedUpdateWithoutQueryInputObjectSchema } from './MaptilerCacheEntryUncheckedUpdateWithoutQueryInput.schema';
import { MaptilerCacheEntryCreateWithoutQueryInputObjectSchema as MaptilerCacheEntryCreateWithoutQueryInputObjectSchema } from './MaptilerCacheEntryCreateWithoutQueryInput.schema';
import { MaptilerCacheEntryUncheckedCreateWithoutQueryInputObjectSchema as MaptilerCacheEntryUncheckedCreateWithoutQueryInputObjectSchema } from './MaptilerCacheEntryUncheckedCreateWithoutQueryInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MaptilerCacheEntryWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => MaptilerCacheEntryUpdateWithoutQueryInputObjectSchema), z.lazy(() => MaptilerCacheEntryUncheckedUpdateWithoutQueryInputObjectSchema)]),
  create: z.union([z.lazy(() => MaptilerCacheEntryCreateWithoutQueryInputObjectSchema), z.lazy(() => MaptilerCacheEntryUncheckedCreateWithoutQueryInputObjectSchema)])
}).strict();
export const MaptilerCacheEntryUpsertWithWhereUniqueWithoutQueryInputObjectSchema: z.ZodType<Prisma.MaptilerCacheEntryUpsertWithWhereUniqueWithoutQueryInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerCacheEntryUpsertWithWhereUniqueWithoutQueryInput>;
export const MaptilerCacheEntryUpsertWithWhereUniqueWithoutQueryInputObjectZodSchema = makeSchema();
