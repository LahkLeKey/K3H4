import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionCreateWithoutActorInputObjectSchema as GeoDirectionCreateWithoutActorInputObjectSchema } from './GeoDirectionCreateWithoutActorInput.schema';
import { GeoDirectionUncheckedCreateWithoutActorInputObjectSchema as GeoDirectionUncheckedCreateWithoutActorInputObjectSchema } from './GeoDirectionUncheckedCreateWithoutActorInput.schema';
import { GeoDirectionCreateOrConnectWithoutActorInputObjectSchema as GeoDirectionCreateOrConnectWithoutActorInputObjectSchema } from './GeoDirectionCreateOrConnectWithoutActorInput.schema';
import { GeoDirectionUpsertWithWhereUniqueWithoutActorInputObjectSchema as GeoDirectionUpsertWithWhereUniqueWithoutActorInputObjectSchema } from './GeoDirectionUpsertWithWhereUniqueWithoutActorInput.schema';
import { GeoDirectionCreateManyActorInputEnvelopeObjectSchema as GeoDirectionCreateManyActorInputEnvelopeObjectSchema } from './GeoDirectionCreateManyActorInputEnvelope.schema';
import { GeoDirectionWhereUniqueInputObjectSchema as GeoDirectionWhereUniqueInputObjectSchema } from './GeoDirectionWhereUniqueInput.schema';
import { GeoDirectionUpdateWithWhereUniqueWithoutActorInputObjectSchema as GeoDirectionUpdateWithWhereUniqueWithoutActorInputObjectSchema } from './GeoDirectionUpdateWithWhereUniqueWithoutActorInput.schema';
import { GeoDirectionUpdateManyWithWhereWithoutActorInputObjectSchema as GeoDirectionUpdateManyWithWhereWithoutActorInputObjectSchema } from './GeoDirectionUpdateManyWithWhereWithoutActorInput.schema';
import { GeoDirectionScalarWhereInputObjectSchema as GeoDirectionScalarWhereInputObjectSchema } from './GeoDirectionScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => GeoDirectionCreateWithoutActorInputObjectSchema), z.lazy(() => GeoDirectionCreateWithoutActorInputObjectSchema).array(), z.lazy(() => GeoDirectionUncheckedCreateWithoutActorInputObjectSchema), z.lazy(() => GeoDirectionUncheckedCreateWithoutActorInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => GeoDirectionCreateOrConnectWithoutActorInputObjectSchema), z.lazy(() => GeoDirectionCreateOrConnectWithoutActorInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => GeoDirectionUpsertWithWhereUniqueWithoutActorInputObjectSchema), z.lazy(() => GeoDirectionUpsertWithWhereUniqueWithoutActorInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => GeoDirectionCreateManyActorInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema), z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema), z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema), z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema), z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => GeoDirectionUpdateWithWhereUniqueWithoutActorInputObjectSchema), z.lazy(() => GeoDirectionUpdateWithWhereUniqueWithoutActorInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => GeoDirectionUpdateManyWithWhereWithoutActorInputObjectSchema), z.lazy(() => GeoDirectionUpdateManyWithWhereWithoutActorInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => GeoDirectionScalarWhereInputObjectSchema), z.lazy(() => GeoDirectionScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const GeoDirectionUpdateManyWithoutActorNestedInputObjectSchema: z.ZodType<Prisma.GeoDirectionUpdateManyWithoutActorNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionUpdateManyWithoutActorNestedInput>;
export const GeoDirectionUpdateManyWithoutActorNestedInputObjectZodSchema = makeSchema();
