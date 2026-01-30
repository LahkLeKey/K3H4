import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionCreateWithoutRouteCacheInputObjectSchema as GeoDirectionCreateWithoutRouteCacheInputObjectSchema } from './GeoDirectionCreateWithoutRouteCacheInput.schema';
import { GeoDirectionUncheckedCreateWithoutRouteCacheInputObjectSchema as GeoDirectionUncheckedCreateWithoutRouteCacheInputObjectSchema } from './GeoDirectionUncheckedCreateWithoutRouteCacheInput.schema';
import { GeoDirectionCreateOrConnectWithoutRouteCacheInputObjectSchema as GeoDirectionCreateOrConnectWithoutRouteCacheInputObjectSchema } from './GeoDirectionCreateOrConnectWithoutRouteCacheInput.schema';
import { GeoDirectionUpsertWithWhereUniqueWithoutRouteCacheInputObjectSchema as GeoDirectionUpsertWithWhereUniqueWithoutRouteCacheInputObjectSchema } from './GeoDirectionUpsertWithWhereUniqueWithoutRouteCacheInput.schema';
import { GeoDirectionCreateManyRouteCacheInputEnvelopeObjectSchema as GeoDirectionCreateManyRouteCacheInputEnvelopeObjectSchema } from './GeoDirectionCreateManyRouteCacheInputEnvelope.schema';
import { GeoDirectionWhereUniqueInputObjectSchema as GeoDirectionWhereUniqueInputObjectSchema } from './GeoDirectionWhereUniqueInput.schema';
import { GeoDirectionUpdateWithWhereUniqueWithoutRouteCacheInputObjectSchema as GeoDirectionUpdateWithWhereUniqueWithoutRouteCacheInputObjectSchema } from './GeoDirectionUpdateWithWhereUniqueWithoutRouteCacheInput.schema';
import { GeoDirectionUpdateManyWithWhereWithoutRouteCacheInputObjectSchema as GeoDirectionUpdateManyWithWhereWithoutRouteCacheInputObjectSchema } from './GeoDirectionUpdateManyWithWhereWithoutRouteCacheInput.schema';
import { GeoDirectionScalarWhereInputObjectSchema as GeoDirectionScalarWhereInputObjectSchema } from './GeoDirectionScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => GeoDirectionCreateWithoutRouteCacheInputObjectSchema), z.lazy(() => GeoDirectionCreateWithoutRouteCacheInputObjectSchema).array(), z.lazy(() => GeoDirectionUncheckedCreateWithoutRouteCacheInputObjectSchema), z.lazy(() => GeoDirectionUncheckedCreateWithoutRouteCacheInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => GeoDirectionCreateOrConnectWithoutRouteCacheInputObjectSchema), z.lazy(() => GeoDirectionCreateOrConnectWithoutRouteCacheInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => GeoDirectionUpsertWithWhereUniqueWithoutRouteCacheInputObjectSchema), z.lazy(() => GeoDirectionUpsertWithWhereUniqueWithoutRouteCacheInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => GeoDirectionCreateManyRouteCacheInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema), z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema), z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema), z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema), z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => GeoDirectionUpdateWithWhereUniqueWithoutRouteCacheInputObjectSchema), z.lazy(() => GeoDirectionUpdateWithWhereUniqueWithoutRouteCacheInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => GeoDirectionUpdateManyWithWhereWithoutRouteCacheInputObjectSchema), z.lazy(() => GeoDirectionUpdateManyWithWhereWithoutRouteCacheInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => GeoDirectionScalarWhereInputObjectSchema), z.lazy(() => GeoDirectionScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const GeoDirectionUpdateManyWithoutRouteCacheNestedInputObjectSchema: z.ZodType<Prisma.GeoDirectionUpdateManyWithoutRouteCacheNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionUpdateManyWithoutRouteCacheNestedInput>;
export const GeoDirectionUpdateManyWithoutRouteCacheNestedInputObjectZodSchema = makeSchema();
