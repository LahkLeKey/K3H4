import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerQueryCreateWithoutCacheEntriesInputObjectSchema as MaptilerQueryCreateWithoutCacheEntriesInputObjectSchema } from './MaptilerQueryCreateWithoutCacheEntriesInput.schema';
import { MaptilerQueryUncheckedCreateWithoutCacheEntriesInputObjectSchema as MaptilerQueryUncheckedCreateWithoutCacheEntriesInputObjectSchema } from './MaptilerQueryUncheckedCreateWithoutCacheEntriesInput.schema';
import { MaptilerQueryCreateOrConnectWithoutCacheEntriesInputObjectSchema as MaptilerQueryCreateOrConnectWithoutCacheEntriesInputObjectSchema } from './MaptilerQueryCreateOrConnectWithoutCacheEntriesInput.schema';
import { MaptilerQueryUpsertWithoutCacheEntriesInputObjectSchema as MaptilerQueryUpsertWithoutCacheEntriesInputObjectSchema } from './MaptilerQueryUpsertWithoutCacheEntriesInput.schema';
import { MaptilerQueryWhereInputObjectSchema as MaptilerQueryWhereInputObjectSchema } from './MaptilerQueryWhereInput.schema';
import { MaptilerQueryWhereUniqueInputObjectSchema as MaptilerQueryWhereUniqueInputObjectSchema } from './MaptilerQueryWhereUniqueInput.schema';
import { MaptilerQueryUpdateToOneWithWhereWithoutCacheEntriesInputObjectSchema as MaptilerQueryUpdateToOneWithWhereWithoutCacheEntriesInputObjectSchema } from './MaptilerQueryUpdateToOneWithWhereWithoutCacheEntriesInput.schema';
import { MaptilerQueryUpdateWithoutCacheEntriesInputObjectSchema as MaptilerQueryUpdateWithoutCacheEntriesInputObjectSchema } from './MaptilerQueryUpdateWithoutCacheEntriesInput.schema';
import { MaptilerQueryUncheckedUpdateWithoutCacheEntriesInputObjectSchema as MaptilerQueryUncheckedUpdateWithoutCacheEntriesInputObjectSchema } from './MaptilerQueryUncheckedUpdateWithoutCacheEntriesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => MaptilerQueryCreateWithoutCacheEntriesInputObjectSchema), z.lazy(() => MaptilerQueryUncheckedCreateWithoutCacheEntriesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => MaptilerQueryCreateOrConnectWithoutCacheEntriesInputObjectSchema).optional(),
  upsert: z.lazy(() => MaptilerQueryUpsertWithoutCacheEntriesInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => MaptilerQueryWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => MaptilerQueryWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => MaptilerQueryWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => MaptilerQueryUpdateToOneWithWhereWithoutCacheEntriesInputObjectSchema), z.lazy(() => MaptilerQueryUpdateWithoutCacheEntriesInputObjectSchema), z.lazy(() => MaptilerQueryUncheckedUpdateWithoutCacheEntriesInputObjectSchema)]).optional()
}).strict();
export const MaptilerQueryUpdateOneWithoutCacheEntriesNestedInputObjectSchema: z.ZodType<Prisma.MaptilerQueryUpdateOneWithoutCacheEntriesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerQueryUpdateOneWithoutCacheEntriesNestedInput>;
export const MaptilerQueryUpdateOneWithoutCacheEntriesNestedInputObjectZodSchema = makeSchema();
