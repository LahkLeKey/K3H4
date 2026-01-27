import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionSegmentCreateWithoutDirectionInputObjectSchema as GeoDirectionSegmentCreateWithoutDirectionInputObjectSchema } from './GeoDirectionSegmentCreateWithoutDirectionInput.schema';
import { GeoDirectionSegmentUncheckedCreateWithoutDirectionInputObjectSchema as GeoDirectionSegmentUncheckedCreateWithoutDirectionInputObjectSchema } from './GeoDirectionSegmentUncheckedCreateWithoutDirectionInput.schema';
import { GeoDirectionSegmentCreateOrConnectWithoutDirectionInputObjectSchema as GeoDirectionSegmentCreateOrConnectWithoutDirectionInputObjectSchema } from './GeoDirectionSegmentCreateOrConnectWithoutDirectionInput.schema';
import { GeoDirectionSegmentUpsertWithWhereUniqueWithoutDirectionInputObjectSchema as GeoDirectionSegmentUpsertWithWhereUniqueWithoutDirectionInputObjectSchema } from './GeoDirectionSegmentUpsertWithWhereUniqueWithoutDirectionInput.schema';
import { GeoDirectionSegmentCreateManyDirectionInputEnvelopeObjectSchema as GeoDirectionSegmentCreateManyDirectionInputEnvelopeObjectSchema } from './GeoDirectionSegmentCreateManyDirectionInputEnvelope.schema';
import { GeoDirectionSegmentWhereUniqueInputObjectSchema as GeoDirectionSegmentWhereUniqueInputObjectSchema } from './GeoDirectionSegmentWhereUniqueInput.schema';
import { GeoDirectionSegmentUpdateWithWhereUniqueWithoutDirectionInputObjectSchema as GeoDirectionSegmentUpdateWithWhereUniqueWithoutDirectionInputObjectSchema } from './GeoDirectionSegmentUpdateWithWhereUniqueWithoutDirectionInput.schema';
import { GeoDirectionSegmentUpdateManyWithWhereWithoutDirectionInputObjectSchema as GeoDirectionSegmentUpdateManyWithWhereWithoutDirectionInputObjectSchema } from './GeoDirectionSegmentUpdateManyWithWhereWithoutDirectionInput.schema';
import { GeoDirectionSegmentScalarWhereInputObjectSchema as GeoDirectionSegmentScalarWhereInputObjectSchema } from './GeoDirectionSegmentScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => GeoDirectionSegmentCreateWithoutDirectionInputObjectSchema), z.lazy(() => GeoDirectionSegmentCreateWithoutDirectionInputObjectSchema).array(), z.lazy(() => GeoDirectionSegmentUncheckedCreateWithoutDirectionInputObjectSchema), z.lazy(() => GeoDirectionSegmentUncheckedCreateWithoutDirectionInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => GeoDirectionSegmentCreateOrConnectWithoutDirectionInputObjectSchema), z.lazy(() => GeoDirectionSegmentCreateOrConnectWithoutDirectionInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => GeoDirectionSegmentUpsertWithWhereUniqueWithoutDirectionInputObjectSchema), z.lazy(() => GeoDirectionSegmentUpsertWithWhereUniqueWithoutDirectionInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => GeoDirectionSegmentCreateManyDirectionInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => GeoDirectionSegmentWhereUniqueInputObjectSchema), z.lazy(() => GeoDirectionSegmentWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => GeoDirectionSegmentWhereUniqueInputObjectSchema), z.lazy(() => GeoDirectionSegmentWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => GeoDirectionSegmentWhereUniqueInputObjectSchema), z.lazy(() => GeoDirectionSegmentWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => GeoDirectionSegmentWhereUniqueInputObjectSchema), z.lazy(() => GeoDirectionSegmentWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => GeoDirectionSegmentUpdateWithWhereUniqueWithoutDirectionInputObjectSchema), z.lazy(() => GeoDirectionSegmentUpdateWithWhereUniqueWithoutDirectionInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => GeoDirectionSegmentUpdateManyWithWhereWithoutDirectionInputObjectSchema), z.lazy(() => GeoDirectionSegmentUpdateManyWithWhereWithoutDirectionInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => GeoDirectionSegmentScalarWhereInputObjectSchema), z.lazy(() => GeoDirectionSegmentScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const GeoDirectionSegmentUpdateManyWithoutDirectionNestedInputObjectSchema: z.ZodType<Prisma.GeoDirectionSegmentUpdateManyWithoutDirectionNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionSegmentUpdateManyWithoutDirectionNestedInput>;
export const GeoDirectionSegmentUpdateManyWithoutDirectionNestedInputObjectZodSchema = makeSchema();
