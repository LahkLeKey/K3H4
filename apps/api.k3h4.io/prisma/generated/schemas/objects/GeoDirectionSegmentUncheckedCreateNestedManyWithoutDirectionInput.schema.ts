import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionSegmentCreateWithoutDirectionInputObjectSchema as GeoDirectionSegmentCreateWithoutDirectionInputObjectSchema } from './GeoDirectionSegmentCreateWithoutDirectionInput.schema';
import { GeoDirectionSegmentUncheckedCreateWithoutDirectionInputObjectSchema as GeoDirectionSegmentUncheckedCreateWithoutDirectionInputObjectSchema } from './GeoDirectionSegmentUncheckedCreateWithoutDirectionInput.schema';
import { GeoDirectionSegmentCreateOrConnectWithoutDirectionInputObjectSchema as GeoDirectionSegmentCreateOrConnectWithoutDirectionInputObjectSchema } from './GeoDirectionSegmentCreateOrConnectWithoutDirectionInput.schema';
import { GeoDirectionSegmentCreateManyDirectionInputEnvelopeObjectSchema as GeoDirectionSegmentCreateManyDirectionInputEnvelopeObjectSchema } from './GeoDirectionSegmentCreateManyDirectionInputEnvelope.schema';
import { GeoDirectionSegmentWhereUniqueInputObjectSchema as GeoDirectionSegmentWhereUniqueInputObjectSchema } from './GeoDirectionSegmentWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => GeoDirectionSegmentCreateWithoutDirectionInputObjectSchema), z.lazy(() => GeoDirectionSegmentCreateWithoutDirectionInputObjectSchema).array(), z.lazy(() => GeoDirectionSegmentUncheckedCreateWithoutDirectionInputObjectSchema), z.lazy(() => GeoDirectionSegmentUncheckedCreateWithoutDirectionInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => GeoDirectionSegmentCreateOrConnectWithoutDirectionInputObjectSchema), z.lazy(() => GeoDirectionSegmentCreateOrConnectWithoutDirectionInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => GeoDirectionSegmentCreateManyDirectionInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => GeoDirectionSegmentWhereUniqueInputObjectSchema), z.lazy(() => GeoDirectionSegmentWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const GeoDirectionSegmentUncheckedCreateNestedManyWithoutDirectionInputObjectSchema: z.ZodType<Prisma.GeoDirectionSegmentUncheckedCreateNestedManyWithoutDirectionInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionSegmentUncheckedCreateNestedManyWithoutDirectionInput>;
export const GeoDirectionSegmentUncheckedCreateNestedManyWithoutDirectionInputObjectZodSchema = makeSchema();
