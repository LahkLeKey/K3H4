import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDemTileCacheCreateWithoutUserInputObjectSchema as GeoDemTileCacheCreateWithoutUserInputObjectSchema } from './GeoDemTileCacheCreateWithoutUserInput.schema';
import { GeoDemTileCacheUncheckedCreateWithoutUserInputObjectSchema as GeoDemTileCacheUncheckedCreateWithoutUserInputObjectSchema } from './GeoDemTileCacheUncheckedCreateWithoutUserInput.schema';
import { GeoDemTileCacheCreateOrConnectWithoutUserInputObjectSchema as GeoDemTileCacheCreateOrConnectWithoutUserInputObjectSchema } from './GeoDemTileCacheCreateOrConnectWithoutUserInput.schema';
import { GeoDemTileCacheCreateManyUserInputEnvelopeObjectSchema as GeoDemTileCacheCreateManyUserInputEnvelopeObjectSchema } from './GeoDemTileCacheCreateManyUserInputEnvelope.schema';
import { GeoDemTileCacheWhereUniqueInputObjectSchema as GeoDemTileCacheWhereUniqueInputObjectSchema } from './GeoDemTileCacheWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => GeoDemTileCacheCreateWithoutUserInputObjectSchema), z.lazy(() => GeoDemTileCacheCreateWithoutUserInputObjectSchema).array(), z.lazy(() => GeoDemTileCacheUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => GeoDemTileCacheUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => GeoDemTileCacheCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => GeoDemTileCacheCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => GeoDemTileCacheCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => GeoDemTileCacheWhereUniqueInputObjectSchema), z.lazy(() => GeoDemTileCacheWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const GeoDemTileCacheCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.GeoDemTileCacheCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDemTileCacheCreateNestedManyWithoutUserInput>;
export const GeoDemTileCacheCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
