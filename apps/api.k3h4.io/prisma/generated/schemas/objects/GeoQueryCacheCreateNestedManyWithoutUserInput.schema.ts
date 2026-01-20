import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoQueryCacheCreateWithoutUserInputObjectSchema as GeoQueryCacheCreateWithoutUserInputObjectSchema } from './GeoQueryCacheCreateWithoutUserInput.schema';
import { GeoQueryCacheUncheckedCreateWithoutUserInputObjectSchema as GeoQueryCacheUncheckedCreateWithoutUserInputObjectSchema } from './GeoQueryCacheUncheckedCreateWithoutUserInput.schema';
import { GeoQueryCacheCreateOrConnectWithoutUserInputObjectSchema as GeoQueryCacheCreateOrConnectWithoutUserInputObjectSchema } from './GeoQueryCacheCreateOrConnectWithoutUserInput.schema';
import { GeoQueryCacheCreateManyUserInputEnvelopeObjectSchema as GeoQueryCacheCreateManyUserInputEnvelopeObjectSchema } from './GeoQueryCacheCreateManyUserInputEnvelope.schema';
import { GeoQueryCacheWhereUniqueInputObjectSchema as GeoQueryCacheWhereUniqueInputObjectSchema } from './GeoQueryCacheWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => GeoQueryCacheCreateWithoutUserInputObjectSchema), z.lazy(() => GeoQueryCacheCreateWithoutUserInputObjectSchema).array(), z.lazy(() => GeoQueryCacheUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => GeoQueryCacheUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => GeoQueryCacheCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => GeoQueryCacheCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => GeoQueryCacheCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => GeoQueryCacheWhereUniqueInputObjectSchema), z.lazy(() => GeoQueryCacheWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const GeoQueryCacheCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.GeoQueryCacheCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoQueryCacheCreateNestedManyWithoutUserInput>;
export const GeoQueryCacheCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
