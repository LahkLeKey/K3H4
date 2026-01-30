import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OsrmCacheEntryCreateWithoutUserInputObjectSchema as OsrmCacheEntryCreateWithoutUserInputObjectSchema } from './OsrmCacheEntryCreateWithoutUserInput.schema';
import { OsrmCacheEntryUncheckedCreateWithoutUserInputObjectSchema as OsrmCacheEntryUncheckedCreateWithoutUserInputObjectSchema } from './OsrmCacheEntryUncheckedCreateWithoutUserInput.schema';
import { OsrmCacheEntryCreateOrConnectWithoutUserInputObjectSchema as OsrmCacheEntryCreateOrConnectWithoutUserInputObjectSchema } from './OsrmCacheEntryCreateOrConnectWithoutUserInput.schema';
import { OsrmCacheEntryUpsertWithWhereUniqueWithoutUserInputObjectSchema as OsrmCacheEntryUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './OsrmCacheEntryUpsertWithWhereUniqueWithoutUserInput.schema';
import { OsrmCacheEntryCreateManyUserInputEnvelopeObjectSchema as OsrmCacheEntryCreateManyUserInputEnvelopeObjectSchema } from './OsrmCacheEntryCreateManyUserInputEnvelope.schema';
import { OsrmCacheEntryWhereUniqueInputObjectSchema as OsrmCacheEntryWhereUniqueInputObjectSchema } from './OsrmCacheEntryWhereUniqueInput.schema';
import { OsrmCacheEntryUpdateWithWhereUniqueWithoutUserInputObjectSchema as OsrmCacheEntryUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './OsrmCacheEntryUpdateWithWhereUniqueWithoutUserInput.schema';
import { OsrmCacheEntryUpdateManyWithWhereWithoutUserInputObjectSchema as OsrmCacheEntryUpdateManyWithWhereWithoutUserInputObjectSchema } from './OsrmCacheEntryUpdateManyWithWhereWithoutUserInput.schema';
import { OsrmCacheEntryScalarWhereInputObjectSchema as OsrmCacheEntryScalarWhereInputObjectSchema } from './OsrmCacheEntryScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OsrmCacheEntryCreateWithoutUserInputObjectSchema), z.lazy(() => OsrmCacheEntryCreateWithoutUserInputObjectSchema).array(), z.lazy(() => OsrmCacheEntryUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => OsrmCacheEntryUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => OsrmCacheEntryCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => OsrmCacheEntryCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => OsrmCacheEntryUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => OsrmCacheEntryUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => OsrmCacheEntryCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => OsrmCacheEntryWhereUniqueInputObjectSchema), z.lazy(() => OsrmCacheEntryWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => OsrmCacheEntryWhereUniqueInputObjectSchema), z.lazy(() => OsrmCacheEntryWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => OsrmCacheEntryWhereUniqueInputObjectSchema), z.lazy(() => OsrmCacheEntryWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => OsrmCacheEntryWhereUniqueInputObjectSchema), z.lazy(() => OsrmCacheEntryWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => OsrmCacheEntryUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => OsrmCacheEntryUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => OsrmCacheEntryUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => OsrmCacheEntryUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => OsrmCacheEntryScalarWhereInputObjectSchema), z.lazy(() => OsrmCacheEntryScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const OsrmCacheEntryUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.OsrmCacheEntryUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.OsrmCacheEntryUpdateManyWithoutUserNestedInput>;
export const OsrmCacheEntryUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
