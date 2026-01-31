import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OsrmCacheEntryCreateWithoutActorInputObjectSchema as OsrmCacheEntryCreateWithoutActorInputObjectSchema } from './OsrmCacheEntryCreateWithoutActorInput.schema';
import { OsrmCacheEntryUncheckedCreateWithoutActorInputObjectSchema as OsrmCacheEntryUncheckedCreateWithoutActorInputObjectSchema } from './OsrmCacheEntryUncheckedCreateWithoutActorInput.schema';
import { OsrmCacheEntryCreateOrConnectWithoutActorInputObjectSchema as OsrmCacheEntryCreateOrConnectWithoutActorInputObjectSchema } from './OsrmCacheEntryCreateOrConnectWithoutActorInput.schema';
import { OsrmCacheEntryUpsertWithWhereUniqueWithoutActorInputObjectSchema as OsrmCacheEntryUpsertWithWhereUniqueWithoutActorInputObjectSchema } from './OsrmCacheEntryUpsertWithWhereUniqueWithoutActorInput.schema';
import { OsrmCacheEntryCreateManyActorInputEnvelopeObjectSchema as OsrmCacheEntryCreateManyActorInputEnvelopeObjectSchema } from './OsrmCacheEntryCreateManyActorInputEnvelope.schema';
import { OsrmCacheEntryWhereUniqueInputObjectSchema as OsrmCacheEntryWhereUniqueInputObjectSchema } from './OsrmCacheEntryWhereUniqueInput.schema';
import { OsrmCacheEntryUpdateWithWhereUniqueWithoutActorInputObjectSchema as OsrmCacheEntryUpdateWithWhereUniqueWithoutActorInputObjectSchema } from './OsrmCacheEntryUpdateWithWhereUniqueWithoutActorInput.schema';
import { OsrmCacheEntryUpdateManyWithWhereWithoutActorInputObjectSchema as OsrmCacheEntryUpdateManyWithWhereWithoutActorInputObjectSchema } from './OsrmCacheEntryUpdateManyWithWhereWithoutActorInput.schema';
import { OsrmCacheEntryScalarWhereInputObjectSchema as OsrmCacheEntryScalarWhereInputObjectSchema } from './OsrmCacheEntryScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OsrmCacheEntryCreateWithoutActorInputObjectSchema), z.lazy(() => OsrmCacheEntryCreateWithoutActorInputObjectSchema).array(), z.lazy(() => OsrmCacheEntryUncheckedCreateWithoutActorInputObjectSchema), z.lazy(() => OsrmCacheEntryUncheckedCreateWithoutActorInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => OsrmCacheEntryCreateOrConnectWithoutActorInputObjectSchema), z.lazy(() => OsrmCacheEntryCreateOrConnectWithoutActorInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => OsrmCacheEntryUpsertWithWhereUniqueWithoutActorInputObjectSchema), z.lazy(() => OsrmCacheEntryUpsertWithWhereUniqueWithoutActorInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => OsrmCacheEntryCreateManyActorInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => OsrmCacheEntryWhereUniqueInputObjectSchema), z.lazy(() => OsrmCacheEntryWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => OsrmCacheEntryWhereUniqueInputObjectSchema), z.lazy(() => OsrmCacheEntryWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => OsrmCacheEntryWhereUniqueInputObjectSchema), z.lazy(() => OsrmCacheEntryWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => OsrmCacheEntryWhereUniqueInputObjectSchema), z.lazy(() => OsrmCacheEntryWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => OsrmCacheEntryUpdateWithWhereUniqueWithoutActorInputObjectSchema), z.lazy(() => OsrmCacheEntryUpdateWithWhereUniqueWithoutActorInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => OsrmCacheEntryUpdateManyWithWhereWithoutActorInputObjectSchema), z.lazy(() => OsrmCacheEntryUpdateManyWithWhereWithoutActorInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => OsrmCacheEntryScalarWhereInputObjectSchema), z.lazy(() => OsrmCacheEntryScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const OsrmCacheEntryUncheckedUpdateManyWithoutActorNestedInputObjectSchema: z.ZodType<Prisma.OsrmCacheEntryUncheckedUpdateManyWithoutActorNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.OsrmCacheEntryUncheckedUpdateManyWithoutActorNestedInput>;
export const OsrmCacheEntryUncheckedUpdateManyWithoutActorNestedInputObjectZodSchema = makeSchema();
