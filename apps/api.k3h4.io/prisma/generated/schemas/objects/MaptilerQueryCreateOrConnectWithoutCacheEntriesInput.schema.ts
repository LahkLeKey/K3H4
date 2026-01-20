import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerQueryWhereUniqueInputObjectSchema as MaptilerQueryWhereUniqueInputObjectSchema } from './MaptilerQueryWhereUniqueInput.schema';
import { MaptilerQueryCreateWithoutCacheEntriesInputObjectSchema as MaptilerQueryCreateWithoutCacheEntriesInputObjectSchema } from './MaptilerQueryCreateWithoutCacheEntriesInput.schema';
import { MaptilerQueryUncheckedCreateWithoutCacheEntriesInputObjectSchema as MaptilerQueryUncheckedCreateWithoutCacheEntriesInputObjectSchema } from './MaptilerQueryUncheckedCreateWithoutCacheEntriesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MaptilerQueryWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => MaptilerQueryCreateWithoutCacheEntriesInputObjectSchema), z.lazy(() => MaptilerQueryUncheckedCreateWithoutCacheEntriesInputObjectSchema)])
}).strict();
export const MaptilerQueryCreateOrConnectWithoutCacheEntriesInputObjectSchema: z.ZodType<Prisma.MaptilerQueryCreateOrConnectWithoutCacheEntriesInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerQueryCreateOrConnectWithoutCacheEntriesInput>;
export const MaptilerQueryCreateOrConnectWithoutCacheEntriesInputObjectZodSchema = makeSchema();
