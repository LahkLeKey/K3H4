import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerCacheEntryCreateWithoutActorInputObjectSchema as MaptilerCacheEntryCreateWithoutActorInputObjectSchema } from './MaptilerCacheEntryCreateWithoutActorInput.schema';
import { MaptilerCacheEntryUncheckedCreateWithoutActorInputObjectSchema as MaptilerCacheEntryUncheckedCreateWithoutActorInputObjectSchema } from './MaptilerCacheEntryUncheckedCreateWithoutActorInput.schema';
import { MaptilerCacheEntryCreateOrConnectWithoutActorInputObjectSchema as MaptilerCacheEntryCreateOrConnectWithoutActorInputObjectSchema } from './MaptilerCacheEntryCreateOrConnectWithoutActorInput.schema';
import { MaptilerCacheEntryCreateManyActorInputEnvelopeObjectSchema as MaptilerCacheEntryCreateManyActorInputEnvelopeObjectSchema } from './MaptilerCacheEntryCreateManyActorInputEnvelope.schema';
import { MaptilerCacheEntryWhereUniqueInputObjectSchema as MaptilerCacheEntryWhereUniqueInputObjectSchema } from './MaptilerCacheEntryWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => MaptilerCacheEntryCreateWithoutActorInputObjectSchema), z.lazy(() => MaptilerCacheEntryCreateWithoutActorInputObjectSchema).array(), z.lazy(() => MaptilerCacheEntryUncheckedCreateWithoutActorInputObjectSchema), z.lazy(() => MaptilerCacheEntryUncheckedCreateWithoutActorInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => MaptilerCacheEntryCreateOrConnectWithoutActorInputObjectSchema), z.lazy(() => MaptilerCacheEntryCreateOrConnectWithoutActorInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => MaptilerCacheEntryCreateManyActorInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => MaptilerCacheEntryWhereUniqueInputObjectSchema), z.lazy(() => MaptilerCacheEntryWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const MaptilerCacheEntryUncheckedCreateNestedManyWithoutActorInputObjectSchema: z.ZodType<Prisma.MaptilerCacheEntryUncheckedCreateNestedManyWithoutActorInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerCacheEntryUncheckedCreateNestedManyWithoutActorInput>;
export const MaptilerCacheEntryUncheckedCreateNestedManyWithoutActorInputObjectZodSchema = makeSchema();
