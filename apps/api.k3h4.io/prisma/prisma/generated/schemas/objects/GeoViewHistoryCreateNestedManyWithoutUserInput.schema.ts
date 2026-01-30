import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoViewHistoryCreateWithoutUserInputObjectSchema as GeoViewHistoryCreateWithoutUserInputObjectSchema } from './GeoViewHistoryCreateWithoutUserInput.schema';
import { GeoViewHistoryUncheckedCreateWithoutUserInputObjectSchema as GeoViewHistoryUncheckedCreateWithoutUserInputObjectSchema } from './GeoViewHistoryUncheckedCreateWithoutUserInput.schema';
import { GeoViewHistoryCreateOrConnectWithoutUserInputObjectSchema as GeoViewHistoryCreateOrConnectWithoutUserInputObjectSchema } from './GeoViewHistoryCreateOrConnectWithoutUserInput.schema';
import { GeoViewHistoryCreateManyUserInputEnvelopeObjectSchema as GeoViewHistoryCreateManyUserInputEnvelopeObjectSchema } from './GeoViewHistoryCreateManyUserInputEnvelope.schema';
import { GeoViewHistoryWhereUniqueInputObjectSchema as GeoViewHistoryWhereUniqueInputObjectSchema } from './GeoViewHistoryWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => GeoViewHistoryCreateWithoutUserInputObjectSchema), z.lazy(() => GeoViewHistoryCreateWithoutUserInputObjectSchema).array(), z.lazy(() => GeoViewHistoryUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => GeoViewHistoryUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => GeoViewHistoryCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => GeoViewHistoryCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => GeoViewHistoryCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => GeoViewHistoryWhereUniqueInputObjectSchema), z.lazy(() => GeoViewHistoryWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const GeoViewHistoryCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.GeoViewHistoryCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoViewHistoryCreateNestedManyWithoutUserInput>;
export const GeoViewHistoryCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
