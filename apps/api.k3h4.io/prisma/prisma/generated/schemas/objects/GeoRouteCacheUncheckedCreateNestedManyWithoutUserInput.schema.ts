import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoRouteCacheCreateWithoutUserInputObjectSchema as GeoRouteCacheCreateWithoutUserInputObjectSchema } from './GeoRouteCacheCreateWithoutUserInput.schema';
import { GeoRouteCacheUncheckedCreateWithoutUserInputObjectSchema as GeoRouteCacheUncheckedCreateWithoutUserInputObjectSchema } from './GeoRouteCacheUncheckedCreateWithoutUserInput.schema';
import { GeoRouteCacheCreateOrConnectWithoutUserInputObjectSchema as GeoRouteCacheCreateOrConnectWithoutUserInputObjectSchema } from './GeoRouteCacheCreateOrConnectWithoutUserInput.schema';
import { GeoRouteCacheCreateManyUserInputEnvelopeObjectSchema as GeoRouteCacheCreateManyUserInputEnvelopeObjectSchema } from './GeoRouteCacheCreateManyUserInputEnvelope.schema';
import { GeoRouteCacheWhereUniqueInputObjectSchema as GeoRouteCacheWhereUniqueInputObjectSchema } from './GeoRouteCacheWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => GeoRouteCacheCreateWithoutUserInputObjectSchema), z.lazy(() => GeoRouteCacheCreateWithoutUserInputObjectSchema).array(), z.lazy(() => GeoRouteCacheUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => GeoRouteCacheUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => GeoRouteCacheCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => GeoRouteCacheCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => GeoRouteCacheCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => GeoRouteCacheWhereUniqueInputObjectSchema), z.lazy(() => GeoRouteCacheWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const GeoRouteCacheUncheckedCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.GeoRouteCacheUncheckedCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoRouteCacheUncheckedCreateNestedManyWithoutUserInput>;
export const GeoRouteCacheUncheckedCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
