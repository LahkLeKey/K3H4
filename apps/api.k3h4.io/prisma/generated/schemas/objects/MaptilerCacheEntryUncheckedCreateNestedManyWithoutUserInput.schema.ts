import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerCacheEntryCreateWithoutUserInputObjectSchema as MaptilerCacheEntryCreateWithoutUserInputObjectSchema } from './MaptilerCacheEntryCreateWithoutUserInput.schema';
import { MaptilerCacheEntryUncheckedCreateWithoutUserInputObjectSchema as MaptilerCacheEntryUncheckedCreateWithoutUserInputObjectSchema } from './MaptilerCacheEntryUncheckedCreateWithoutUserInput.schema';
import { MaptilerCacheEntryCreateOrConnectWithoutUserInputObjectSchema as MaptilerCacheEntryCreateOrConnectWithoutUserInputObjectSchema } from './MaptilerCacheEntryCreateOrConnectWithoutUserInput.schema';
import { MaptilerCacheEntryCreateManyUserInputEnvelopeObjectSchema as MaptilerCacheEntryCreateManyUserInputEnvelopeObjectSchema } from './MaptilerCacheEntryCreateManyUserInputEnvelope.schema';
import { MaptilerCacheEntryWhereUniqueInputObjectSchema as MaptilerCacheEntryWhereUniqueInputObjectSchema } from './MaptilerCacheEntryWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => MaptilerCacheEntryCreateWithoutUserInputObjectSchema), z.lazy(() => MaptilerCacheEntryCreateWithoutUserInputObjectSchema).array(), z.lazy(() => MaptilerCacheEntryUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => MaptilerCacheEntryUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => MaptilerCacheEntryCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => MaptilerCacheEntryCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => MaptilerCacheEntryCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => MaptilerCacheEntryWhereUniqueInputObjectSchema), z.lazy(() => MaptilerCacheEntryWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const MaptilerCacheEntryUncheckedCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.MaptilerCacheEntryUncheckedCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerCacheEntryUncheckedCreateNestedManyWithoutUserInput>;
export const MaptilerCacheEntryUncheckedCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
