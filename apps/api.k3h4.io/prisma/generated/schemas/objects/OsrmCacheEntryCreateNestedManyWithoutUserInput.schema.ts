import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OsrmCacheEntryCreateWithoutUserInputObjectSchema as OsrmCacheEntryCreateWithoutUserInputObjectSchema } from './OsrmCacheEntryCreateWithoutUserInput.schema';
import { OsrmCacheEntryUncheckedCreateWithoutUserInputObjectSchema as OsrmCacheEntryUncheckedCreateWithoutUserInputObjectSchema } from './OsrmCacheEntryUncheckedCreateWithoutUserInput.schema';
import { OsrmCacheEntryCreateOrConnectWithoutUserInputObjectSchema as OsrmCacheEntryCreateOrConnectWithoutUserInputObjectSchema } from './OsrmCacheEntryCreateOrConnectWithoutUserInput.schema';
import { OsrmCacheEntryCreateManyUserInputEnvelopeObjectSchema as OsrmCacheEntryCreateManyUserInputEnvelopeObjectSchema } from './OsrmCacheEntryCreateManyUserInputEnvelope.schema';
import { OsrmCacheEntryWhereUniqueInputObjectSchema as OsrmCacheEntryWhereUniqueInputObjectSchema } from './OsrmCacheEntryWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OsrmCacheEntryCreateWithoutUserInputObjectSchema), z.lazy(() => OsrmCacheEntryCreateWithoutUserInputObjectSchema).array(), z.lazy(() => OsrmCacheEntryUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => OsrmCacheEntryUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => OsrmCacheEntryCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => OsrmCacheEntryCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => OsrmCacheEntryCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => OsrmCacheEntryWhereUniqueInputObjectSchema), z.lazy(() => OsrmCacheEntryWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const OsrmCacheEntryCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.OsrmCacheEntryCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.OsrmCacheEntryCreateNestedManyWithoutUserInput>;
export const OsrmCacheEntryCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
