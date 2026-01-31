import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerCacheEntryWhereUniqueInputObjectSchema as MaptilerCacheEntryWhereUniqueInputObjectSchema } from './MaptilerCacheEntryWhereUniqueInput.schema';
import { MaptilerCacheEntryUpdateWithoutActorInputObjectSchema as MaptilerCacheEntryUpdateWithoutActorInputObjectSchema } from './MaptilerCacheEntryUpdateWithoutActorInput.schema';
import { MaptilerCacheEntryUncheckedUpdateWithoutActorInputObjectSchema as MaptilerCacheEntryUncheckedUpdateWithoutActorInputObjectSchema } from './MaptilerCacheEntryUncheckedUpdateWithoutActorInput.schema';
import { MaptilerCacheEntryCreateWithoutActorInputObjectSchema as MaptilerCacheEntryCreateWithoutActorInputObjectSchema } from './MaptilerCacheEntryCreateWithoutActorInput.schema';
import { MaptilerCacheEntryUncheckedCreateWithoutActorInputObjectSchema as MaptilerCacheEntryUncheckedCreateWithoutActorInputObjectSchema } from './MaptilerCacheEntryUncheckedCreateWithoutActorInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MaptilerCacheEntryWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => MaptilerCacheEntryUpdateWithoutActorInputObjectSchema), z.lazy(() => MaptilerCacheEntryUncheckedUpdateWithoutActorInputObjectSchema)]),
  create: z.union([z.lazy(() => MaptilerCacheEntryCreateWithoutActorInputObjectSchema), z.lazy(() => MaptilerCacheEntryUncheckedCreateWithoutActorInputObjectSchema)])
}).strict();
export const MaptilerCacheEntryUpsertWithWhereUniqueWithoutActorInputObjectSchema: z.ZodType<Prisma.MaptilerCacheEntryUpsertWithWhereUniqueWithoutActorInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerCacheEntryUpsertWithWhereUniqueWithoutActorInput>;
export const MaptilerCacheEntryUpsertWithWhereUniqueWithoutActorInputObjectZodSchema = makeSchema();
