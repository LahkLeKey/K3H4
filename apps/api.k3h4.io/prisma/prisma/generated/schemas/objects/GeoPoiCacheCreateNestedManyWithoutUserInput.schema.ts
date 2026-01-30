import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoPoiCacheCreateWithoutUserInputObjectSchema as GeoPoiCacheCreateWithoutUserInputObjectSchema } from './GeoPoiCacheCreateWithoutUserInput.schema';
import { GeoPoiCacheUncheckedCreateWithoutUserInputObjectSchema as GeoPoiCacheUncheckedCreateWithoutUserInputObjectSchema } from './GeoPoiCacheUncheckedCreateWithoutUserInput.schema';
import { GeoPoiCacheCreateOrConnectWithoutUserInputObjectSchema as GeoPoiCacheCreateOrConnectWithoutUserInputObjectSchema } from './GeoPoiCacheCreateOrConnectWithoutUserInput.schema';
import { GeoPoiCacheCreateManyUserInputEnvelopeObjectSchema as GeoPoiCacheCreateManyUserInputEnvelopeObjectSchema } from './GeoPoiCacheCreateManyUserInputEnvelope.schema';
import { GeoPoiCacheWhereUniqueInputObjectSchema as GeoPoiCacheWhereUniqueInputObjectSchema } from './GeoPoiCacheWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => GeoPoiCacheCreateWithoutUserInputObjectSchema), z.lazy(() => GeoPoiCacheCreateWithoutUserInputObjectSchema).array(), z.lazy(() => GeoPoiCacheUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => GeoPoiCacheUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => GeoPoiCacheCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => GeoPoiCacheCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => GeoPoiCacheCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => GeoPoiCacheWhereUniqueInputObjectSchema), z.lazy(() => GeoPoiCacheWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const GeoPoiCacheCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.GeoPoiCacheCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoPoiCacheCreateNestedManyWithoutUserInput>;
export const GeoPoiCacheCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
