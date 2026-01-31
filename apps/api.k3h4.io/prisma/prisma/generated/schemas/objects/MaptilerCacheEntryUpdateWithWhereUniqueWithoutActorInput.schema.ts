import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerCacheEntryWhereUniqueInputObjectSchema as MaptilerCacheEntryWhereUniqueInputObjectSchema } from './MaptilerCacheEntryWhereUniqueInput.schema';
import { MaptilerCacheEntryUpdateWithoutActorInputObjectSchema as MaptilerCacheEntryUpdateWithoutActorInputObjectSchema } from './MaptilerCacheEntryUpdateWithoutActorInput.schema';
import { MaptilerCacheEntryUncheckedUpdateWithoutActorInputObjectSchema as MaptilerCacheEntryUncheckedUpdateWithoutActorInputObjectSchema } from './MaptilerCacheEntryUncheckedUpdateWithoutActorInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MaptilerCacheEntryWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => MaptilerCacheEntryUpdateWithoutActorInputObjectSchema), z.lazy(() => MaptilerCacheEntryUncheckedUpdateWithoutActorInputObjectSchema)])
}).strict();
export const MaptilerCacheEntryUpdateWithWhereUniqueWithoutActorInputObjectSchema: z.ZodType<Prisma.MaptilerCacheEntryUpdateWithWhereUniqueWithoutActorInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerCacheEntryUpdateWithWhereUniqueWithoutActorInput>;
export const MaptilerCacheEntryUpdateWithWhereUniqueWithoutActorInputObjectZodSchema = makeSchema();
