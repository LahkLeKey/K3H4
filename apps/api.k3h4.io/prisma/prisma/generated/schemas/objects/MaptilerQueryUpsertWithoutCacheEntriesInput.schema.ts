import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerQueryUpdateWithoutCacheEntriesInputObjectSchema as MaptilerQueryUpdateWithoutCacheEntriesInputObjectSchema } from './MaptilerQueryUpdateWithoutCacheEntriesInput.schema';
import { MaptilerQueryUncheckedUpdateWithoutCacheEntriesInputObjectSchema as MaptilerQueryUncheckedUpdateWithoutCacheEntriesInputObjectSchema } from './MaptilerQueryUncheckedUpdateWithoutCacheEntriesInput.schema';
import { MaptilerQueryCreateWithoutCacheEntriesInputObjectSchema as MaptilerQueryCreateWithoutCacheEntriesInputObjectSchema } from './MaptilerQueryCreateWithoutCacheEntriesInput.schema';
import { MaptilerQueryUncheckedCreateWithoutCacheEntriesInputObjectSchema as MaptilerQueryUncheckedCreateWithoutCacheEntriesInputObjectSchema } from './MaptilerQueryUncheckedCreateWithoutCacheEntriesInput.schema';
import { MaptilerQueryWhereInputObjectSchema as MaptilerQueryWhereInputObjectSchema } from './MaptilerQueryWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => MaptilerQueryUpdateWithoutCacheEntriesInputObjectSchema), z.lazy(() => MaptilerQueryUncheckedUpdateWithoutCacheEntriesInputObjectSchema)]),
  create: z.union([z.lazy(() => MaptilerQueryCreateWithoutCacheEntriesInputObjectSchema), z.lazy(() => MaptilerQueryUncheckedCreateWithoutCacheEntriesInputObjectSchema)]),
  where: z.lazy(() => MaptilerQueryWhereInputObjectSchema).optional()
}).strict();
export const MaptilerQueryUpsertWithoutCacheEntriesInputObjectSchema: z.ZodType<Prisma.MaptilerQueryUpsertWithoutCacheEntriesInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerQueryUpsertWithoutCacheEntriesInput>;
export const MaptilerQueryUpsertWithoutCacheEntriesInputObjectZodSchema = makeSchema();
