import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerQueryCreateWithoutCacheEntriesInputObjectSchema as MaptilerQueryCreateWithoutCacheEntriesInputObjectSchema } from './MaptilerQueryCreateWithoutCacheEntriesInput.schema';
import { MaptilerQueryUncheckedCreateWithoutCacheEntriesInputObjectSchema as MaptilerQueryUncheckedCreateWithoutCacheEntriesInputObjectSchema } from './MaptilerQueryUncheckedCreateWithoutCacheEntriesInput.schema';
import { MaptilerQueryCreateOrConnectWithoutCacheEntriesInputObjectSchema as MaptilerQueryCreateOrConnectWithoutCacheEntriesInputObjectSchema } from './MaptilerQueryCreateOrConnectWithoutCacheEntriesInput.schema';
import { MaptilerQueryWhereUniqueInputObjectSchema as MaptilerQueryWhereUniqueInputObjectSchema } from './MaptilerQueryWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => MaptilerQueryCreateWithoutCacheEntriesInputObjectSchema), z.lazy(() => MaptilerQueryUncheckedCreateWithoutCacheEntriesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => MaptilerQueryCreateOrConnectWithoutCacheEntriesInputObjectSchema).optional(),
  connect: z.lazy(() => MaptilerQueryWhereUniqueInputObjectSchema).optional()
}).strict();
export const MaptilerQueryCreateNestedOneWithoutCacheEntriesInputObjectSchema: z.ZodType<Prisma.MaptilerQueryCreateNestedOneWithoutCacheEntriesInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerQueryCreateNestedOneWithoutCacheEntriesInput>;
export const MaptilerQueryCreateNestedOneWithoutCacheEntriesInputObjectZodSchema = makeSchema();
