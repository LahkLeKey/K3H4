import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerCacheEntryCreateWithoutUserInputObjectSchema as MaptilerCacheEntryCreateWithoutUserInputObjectSchema } from './MaptilerCacheEntryCreateWithoutUserInput.schema';
import { MaptilerCacheEntryUncheckedCreateWithoutUserInputObjectSchema as MaptilerCacheEntryUncheckedCreateWithoutUserInputObjectSchema } from './MaptilerCacheEntryUncheckedCreateWithoutUserInput.schema';
import { MaptilerCacheEntryCreateOrConnectWithoutUserInputObjectSchema as MaptilerCacheEntryCreateOrConnectWithoutUserInputObjectSchema } from './MaptilerCacheEntryCreateOrConnectWithoutUserInput.schema';
import { MaptilerCacheEntryUpsertWithWhereUniqueWithoutUserInputObjectSchema as MaptilerCacheEntryUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './MaptilerCacheEntryUpsertWithWhereUniqueWithoutUserInput.schema';
import { MaptilerCacheEntryCreateManyUserInputEnvelopeObjectSchema as MaptilerCacheEntryCreateManyUserInputEnvelopeObjectSchema } from './MaptilerCacheEntryCreateManyUserInputEnvelope.schema';
import { MaptilerCacheEntryWhereUniqueInputObjectSchema as MaptilerCacheEntryWhereUniqueInputObjectSchema } from './MaptilerCacheEntryWhereUniqueInput.schema';
import { MaptilerCacheEntryUpdateWithWhereUniqueWithoutUserInputObjectSchema as MaptilerCacheEntryUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './MaptilerCacheEntryUpdateWithWhereUniqueWithoutUserInput.schema';
import { MaptilerCacheEntryUpdateManyWithWhereWithoutUserInputObjectSchema as MaptilerCacheEntryUpdateManyWithWhereWithoutUserInputObjectSchema } from './MaptilerCacheEntryUpdateManyWithWhereWithoutUserInput.schema';
import { MaptilerCacheEntryScalarWhereInputObjectSchema as MaptilerCacheEntryScalarWhereInputObjectSchema } from './MaptilerCacheEntryScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => MaptilerCacheEntryCreateWithoutUserInputObjectSchema), z.lazy(() => MaptilerCacheEntryCreateWithoutUserInputObjectSchema).array(), z.lazy(() => MaptilerCacheEntryUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => MaptilerCacheEntryUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => MaptilerCacheEntryCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => MaptilerCacheEntryCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => MaptilerCacheEntryUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => MaptilerCacheEntryUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => MaptilerCacheEntryCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => MaptilerCacheEntryWhereUniqueInputObjectSchema), z.lazy(() => MaptilerCacheEntryWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => MaptilerCacheEntryWhereUniqueInputObjectSchema), z.lazy(() => MaptilerCacheEntryWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => MaptilerCacheEntryWhereUniqueInputObjectSchema), z.lazy(() => MaptilerCacheEntryWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => MaptilerCacheEntryWhereUniqueInputObjectSchema), z.lazy(() => MaptilerCacheEntryWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => MaptilerCacheEntryUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => MaptilerCacheEntryUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => MaptilerCacheEntryUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => MaptilerCacheEntryUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => MaptilerCacheEntryScalarWhereInputObjectSchema), z.lazy(() => MaptilerCacheEntryScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const MaptilerCacheEntryUncheckedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.MaptilerCacheEntryUncheckedUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerCacheEntryUncheckedUpdateManyWithoutUserNestedInput>;
export const MaptilerCacheEntryUncheckedUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
