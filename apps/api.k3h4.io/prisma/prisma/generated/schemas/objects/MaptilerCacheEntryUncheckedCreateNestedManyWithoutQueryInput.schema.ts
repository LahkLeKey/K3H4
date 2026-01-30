import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerCacheEntryCreateWithoutQueryInputObjectSchema as MaptilerCacheEntryCreateWithoutQueryInputObjectSchema } from './MaptilerCacheEntryCreateWithoutQueryInput.schema';
import { MaptilerCacheEntryUncheckedCreateWithoutQueryInputObjectSchema as MaptilerCacheEntryUncheckedCreateWithoutQueryInputObjectSchema } from './MaptilerCacheEntryUncheckedCreateWithoutQueryInput.schema';
import { MaptilerCacheEntryCreateOrConnectWithoutQueryInputObjectSchema as MaptilerCacheEntryCreateOrConnectWithoutQueryInputObjectSchema } from './MaptilerCacheEntryCreateOrConnectWithoutQueryInput.schema';
import { MaptilerCacheEntryCreateManyQueryInputEnvelopeObjectSchema as MaptilerCacheEntryCreateManyQueryInputEnvelopeObjectSchema } from './MaptilerCacheEntryCreateManyQueryInputEnvelope.schema';
import { MaptilerCacheEntryWhereUniqueInputObjectSchema as MaptilerCacheEntryWhereUniqueInputObjectSchema } from './MaptilerCacheEntryWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => MaptilerCacheEntryCreateWithoutQueryInputObjectSchema), z.lazy(() => MaptilerCacheEntryCreateWithoutQueryInputObjectSchema).array(), z.lazy(() => MaptilerCacheEntryUncheckedCreateWithoutQueryInputObjectSchema), z.lazy(() => MaptilerCacheEntryUncheckedCreateWithoutQueryInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => MaptilerCacheEntryCreateOrConnectWithoutQueryInputObjectSchema), z.lazy(() => MaptilerCacheEntryCreateOrConnectWithoutQueryInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => MaptilerCacheEntryCreateManyQueryInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => MaptilerCacheEntryWhereUniqueInputObjectSchema), z.lazy(() => MaptilerCacheEntryWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const MaptilerCacheEntryUncheckedCreateNestedManyWithoutQueryInputObjectSchema: z.ZodType<Prisma.MaptilerCacheEntryUncheckedCreateNestedManyWithoutQueryInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerCacheEntryUncheckedCreateNestedManyWithoutQueryInput>;
export const MaptilerCacheEntryUncheckedCreateNestedManyWithoutQueryInputObjectZodSchema = makeSchema();
