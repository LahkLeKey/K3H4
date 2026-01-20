import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerCacheEntryCreateWithoutQueryInputObjectSchema as MaptilerCacheEntryCreateWithoutQueryInputObjectSchema } from './MaptilerCacheEntryCreateWithoutQueryInput.schema';
import { MaptilerCacheEntryUncheckedCreateWithoutQueryInputObjectSchema as MaptilerCacheEntryUncheckedCreateWithoutQueryInputObjectSchema } from './MaptilerCacheEntryUncheckedCreateWithoutQueryInput.schema';
import { MaptilerCacheEntryCreateOrConnectWithoutQueryInputObjectSchema as MaptilerCacheEntryCreateOrConnectWithoutQueryInputObjectSchema } from './MaptilerCacheEntryCreateOrConnectWithoutQueryInput.schema';
import { MaptilerCacheEntryUpsertWithWhereUniqueWithoutQueryInputObjectSchema as MaptilerCacheEntryUpsertWithWhereUniqueWithoutQueryInputObjectSchema } from './MaptilerCacheEntryUpsertWithWhereUniqueWithoutQueryInput.schema';
import { MaptilerCacheEntryCreateManyQueryInputEnvelopeObjectSchema as MaptilerCacheEntryCreateManyQueryInputEnvelopeObjectSchema } from './MaptilerCacheEntryCreateManyQueryInputEnvelope.schema';
import { MaptilerCacheEntryWhereUniqueInputObjectSchema as MaptilerCacheEntryWhereUniqueInputObjectSchema } from './MaptilerCacheEntryWhereUniqueInput.schema';
import { MaptilerCacheEntryUpdateWithWhereUniqueWithoutQueryInputObjectSchema as MaptilerCacheEntryUpdateWithWhereUniqueWithoutQueryInputObjectSchema } from './MaptilerCacheEntryUpdateWithWhereUniqueWithoutQueryInput.schema';
import { MaptilerCacheEntryUpdateManyWithWhereWithoutQueryInputObjectSchema as MaptilerCacheEntryUpdateManyWithWhereWithoutQueryInputObjectSchema } from './MaptilerCacheEntryUpdateManyWithWhereWithoutQueryInput.schema';
import { MaptilerCacheEntryScalarWhereInputObjectSchema as MaptilerCacheEntryScalarWhereInputObjectSchema } from './MaptilerCacheEntryScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => MaptilerCacheEntryCreateWithoutQueryInputObjectSchema), z.lazy(() => MaptilerCacheEntryCreateWithoutQueryInputObjectSchema).array(), z.lazy(() => MaptilerCacheEntryUncheckedCreateWithoutQueryInputObjectSchema), z.lazy(() => MaptilerCacheEntryUncheckedCreateWithoutQueryInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => MaptilerCacheEntryCreateOrConnectWithoutQueryInputObjectSchema), z.lazy(() => MaptilerCacheEntryCreateOrConnectWithoutQueryInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => MaptilerCacheEntryUpsertWithWhereUniqueWithoutQueryInputObjectSchema), z.lazy(() => MaptilerCacheEntryUpsertWithWhereUniqueWithoutQueryInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => MaptilerCacheEntryCreateManyQueryInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => MaptilerCacheEntryWhereUniqueInputObjectSchema), z.lazy(() => MaptilerCacheEntryWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => MaptilerCacheEntryWhereUniqueInputObjectSchema), z.lazy(() => MaptilerCacheEntryWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => MaptilerCacheEntryWhereUniqueInputObjectSchema), z.lazy(() => MaptilerCacheEntryWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => MaptilerCacheEntryWhereUniqueInputObjectSchema), z.lazy(() => MaptilerCacheEntryWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => MaptilerCacheEntryUpdateWithWhereUniqueWithoutQueryInputObjectSchema), z.lazy(() => MaptilerCacheEntryUpdateWithWhereUniqueWithoutQueryInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => MaptilerCacheEntryUpdateManyWithWhereWithoutQueryInputObjectSchema), z.lazy(() => MaptilerCacheEntryUpdateManyWithWhereWithoutQueryInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => MaptilerCacheEntryScalarWhereInputObjectSchema), z.lazy(() => MaptilerCacheEntryScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const MaptilerCacheEntryUncheckedUpdateManyWithoutQueryNestedInputObjectSchema: z.ZodType<Prisma.MaptilerCacheEntryUncheckedUpdateManyWithoutQueryNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerCacheEntryUncheckedUpdateManyWithoutQueryNestedInput>;
export const MaptilerCacheEntryUncheckedUpdateManyWithoutQueryNestedInputObjectZodSchema = makeSchema();
