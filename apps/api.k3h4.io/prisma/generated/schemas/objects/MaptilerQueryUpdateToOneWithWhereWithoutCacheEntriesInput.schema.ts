import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerQueryWhereInputObjectSchema as MaptilerQueryWhereInputObjectSchema } from './MaptilerQueryWhereInput.schema';
import { MaptilerQueryUpdateWithoutCacheEntriesInputObjectSchema as MaptilerQueryUpdateWithoutCacheEntriesInputObjectSchema } from './MaptilerQueryUpdateWithoutCacheEntriesInput.schema';
import { MaptilerQueryUncheckedUpdateWithoutCacheEntriesInputObjectSchema as MaptilerQueryUncheckedUpdateWithoutCacheEntriesInputObjectSchema } from './MaptilerQueryUncheckedUpdateWithoutCacheEntriesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MaptilerQueryWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => MaptilerQueryUpdateWithoutCacheEntriesInputObjectSchema), z.lazy(() => MaptilerQueryUncheckedUpdateWithoutCacheEntriesInputObjectSchema)])
}).strict();
export const MaptilerQueryUpdateToOneWithWhereWithoutCacheEntriesInputObjectSchema: z.ZodType<Prisma.MaptilerQueryUpdateToOneWithWhereWithoutCacheEntriesInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerQueryUpdateToOneWithWhereWithoutCacheEntriesInput>;
export const MaptilerQueryUpdateToOneWithWhereWithoutCacheEntriesInputObjectZodSchema = makeSchema();
