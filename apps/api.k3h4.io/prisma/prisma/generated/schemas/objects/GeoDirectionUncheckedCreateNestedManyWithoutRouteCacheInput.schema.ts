import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionCreateWithoutRouteCacheInputObjectSchema as GeoDirectionCreateWithoutRouteCacheInputObjectSchema } from './GeoDirectionCreateWithoutRouteCacheInput.schema';
import { GeoDirectionUncheckedCreateWithoutRouteCacheInputObjectSchema as GeoDirectionUncheckedCreateWithoutRouteCacheInputObjectSchema } from './GeoDirectionUncheckedCreateWithoutRouteCacheInput.schema';
import { GeoDirectionCreateOrConnectWithoutRouteCacheInputObjectSchema as GeoDirectionCreateOrConnectWithoutRouteCacheInputObjectSchema } from './GeoDirectionCreateOrConnectWithoutRouteCacheInput.schema';
import { GeoDirectionCreateManyRouteCacheInputEnvelopeObjectSchema as GeoDirectionCreateManyRouteCacheInputEnvelopeObjectSchema } from './GeoDirectionCreateManyRouteCacheInputEnvelope.schema';
import { GeoDirectionWhereUniqueInputObjectSchema as GeoDirectionWhereUniqueInputObjectSchema } from './GeoDirectionWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => GeoDirectionCreateWithoutRouteCacheInputObjectSchema), z.lazy(() => GeoDirectionCreateWithoutRouteCacheInputObjectSchema).array(), z.lazy(() => GeoDirectionUncheckedCreateWithoutRouteCacheInputObjectSchema), z.lazy(() => GeoDirectionUncheckedCreateWithoutRouteCacheInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => GeoDirectionCreateOrConnectWithoutRouteCacheInputObjectSchema), z.lazy(() => GeoDirectionCreateOrConnectWithoutRouteCacheInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => GeoDirectionCreateManyRouteCacheInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema), z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const GeoDirectionUncheckedCreateNestedManyWithoutRouteCacheInputObjectSchema: z.ZodType<Prisma.GeoDirectionUncheckedCreateNestedManyWithoutRouteCacheInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionUncheckedCreateNestedManyWithoutRouteCacheInput>;
export const GeoDirectionUncheckedCreateNestedManyWithoutRouteCacheInputObjectZodSchema = makeSchema();
