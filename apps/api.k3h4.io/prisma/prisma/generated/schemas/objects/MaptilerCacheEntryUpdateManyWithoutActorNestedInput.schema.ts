import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerCacheEntryCreateWithoutActorInputObjectSchema as MaptilerCacheEntryCreateWithoutActorInputObjectSchema } from './MaptilerCacheEntryCreateWithoutActorInput.schema';
import { MaptilerCacheEntryUncheckedCreateWithoutActorInputObjectSchema as MaptilerCacheEntryUncheckedCreateWithoutActorInputObjectSchema } from './MaptilerCacheEntryUncheckedCreateWithoutActorInput.schema';
import { MaptilerCacheEntryCreateOrConnectWithoutActorInputObjectSchema as MaptilerCacheEntryCreateOrConnectWithoutActorInputObjectSchema } from './MaptilerCacheEntryCreateOrConnectWithoutActorInput.schema';
import { MaptilerCacheEntryUpsertWithWhereUniqueWithoutActorInputObjectSchema as MaptilerCacheEntryUpsertWithWhereUniqueWithoutActorInputObjectSchema } from './MaptilerCacheEntryUpsertWithWhereUniqueWithoutActorInput.schema';
import { MaptilerCacheEntryCreateManyActorInputEnvelopeObjectSchema as MaptilerCacheEntryCreateManyActorInputEnvelopeObjectSchema } from './MaptilerCacheEntryCreateManyActorInputEnvelope.schema';
import { MaptilerCacheEntryWhereUniqueInputObjectSchema as MaptilerCacheEntryWhereUniqueInputObjectSchema } from './MaptilerCacheEntryWhereUniqueInput.schema';
import { MaptilerCacheEntryUpdateWithWhereUniqueWithoutActorInputObjectSchema as MaptilerCacheEntryUpdateWithWhereUniqueWithoutActorInputObjectSchema } from './MaptilerCacheEntryUpdateWithWhereUniqueWithoutActorInput.schema';
import { MaptilerCacheEntryUpdateManyWithWhereWithoutActorInputObjectSchema as MaptilerCacheEntryUpdateManyWithWhereWithoutActorInputObjectSchema } from './MaptilerCacheEntryUpdateManyWithWhereWithoutActorInput.schema';
import { MaptilerCacheEntryScalarWhereInputObjectSchema as MaptilerCacheEntryScalarWhereInputObjectSchema } from './MaptilerCacheEntryScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => MaptilerCacheEntryCreateWithoutActorInputObjectSchema), z.lazy(() => MaptilerCacheEntryCreateWithoutActorInputObjectSchema).array(), z.lazy(() => MaptilerCacheEntryUncheckedCreateWithoutActorInputObjectSchema), z.lazy(() => MaptilerCacheEntryUncheckedCreateWithoutActorInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => MaptilerCacheEntryCreateOrConnectWithoutActorInputObjectSchema), z.lazy(() => MaptilerCacheEntryCreateOrConnectWithoutActorInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => MaptilerCacheEntryUpsertWithWhereUniqueWithoutActorInputObjectSchema), z.lazy(() => MaptilerCacheEntryUpsertWithWhereUniqueWithoutActorInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => MaptilerCacheEntryCreateManyActorInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => MaptilerCacheEntryWhereUniqueInputObjectSchema), z.lazy(() => MaptilerCacheEntryWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => MaptilerCacheEntryWhereUniqueInputObjectSchema), z.lazy(() => MaptilerCacheEntryWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => MaptilerCacheEntryWhereUniqueInputObjectSchema), z.lazy(() => MaptilerCacheEntryWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => MaptilerCacheEntryWhereUniqueInputObjectSchema), z.lazy(() => MaptilerCacheEntryWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => MaptilerCacheEntryUpdateWithWhereUniqueWithoutActorInputObjectSchema), z.lazy(() => MaptilerCacheEntryUpdateWithWhereUniqueWithoutActorInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => MaptilerCacheEntryUpdateManyWithWhereWithoutActorInputObjectSchema), z.lazy(() => MaptilerCacheEntryUpdateManyWithWhereWithoutActorInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => MaptilerCacheEntryScalarWhereInputObjectSchema), z.lazy(() => MaptilerCacheEntryScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const MaptilerCacheEntryUpdateManyWithoutActorNestedInputObjectSchema: z.ZodType<Prisma.MaptilerCacheEntryUpdateManyWithoutActorNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerCacheEntryUpdateManyWithoutActorNestedInput>;
export const MaptilerCacheEntryUpdateManyWithoutActorNestedInputObjectZodSchema = makeSchema();
