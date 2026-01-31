import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OsrmCacheEntryCreateWithoutActorInputObjectSchema as OsrmCacheEntryCreateWithoutActorInputObjectSchema } from './OsrmCacheEntryCreateWithoutActorInput.schema';
import { OsrmCacheEntryUncheckedCreateWithoutActorInputObjectSchema as OsrmCacheEntryUncheckedCreateWithoutActorInputObjectSchema } from './OsrmCacheEntryUncheckedCreateWithoutActorInput.schema';
import { OsrmCacheEntryCreateOrConnectWithoutActorInputObjectSchema as OsrmCacheEntryCreateOrConnectWithoutActorInputObjectSchema } from './OsrmCacheEntryCreateOrConnectWithoutActorInput.schema';
import { OsrmCacheEntryCreateManyActorInputEnvelopeObjectSchema as OsrmCacheEntryCreateManyActorInputEnvelopeObjectSchema } from './OsrmCacheEntryCreateManyActorInputEnvelope.schema';
import { OsrmCacheEntryWhereUniqueInputObjectSchema as OsrmCacheEntryWhereUniqueInputObjectSchema } from './OsrmCacheEntryWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OsrmCacheEntryCreateWithoutActorInputObjectSchema), z.lazy(() => OsrmCacheEntryCreateWithoutActorInputObjectSchema).array(), z.lazy(() => OsrmCacheEntryUncheckedCreateWithoutActorInputObjectSchema), z.lazy(() => OsrmCacheEntryUncheckedCreateWithoutActorInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => OsrmCacheEntryCreateOrConnectWithoutActorInputObjectSchema), z.lazy(() => OsrmCacheEntryCreateOrConnectWithoutActorInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => OsrmCacheEntryCreateManyActorInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => OsrmCacheEntryWhereUniqueInputObjectSchema), z.lazy(() => OsrmCacheEntryWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const OsrmCacheEntryUncheckedCreateNestedManyWithoutActorInputObjectSchema: z.ZodType<Prisma.OsrmCacheEntryUncheckedCreateNestedManyWithoutActorInput> = makeSchema() as unknown as z.ZodType<Prisma.OsrmCacheEntryUncheckedCreateNestedManyWithoutActorInput>;
export const OsrmCacheEntryUncheckedCreateNestedManyWithoutActorInputObjectZodSchema = makeSchema();
