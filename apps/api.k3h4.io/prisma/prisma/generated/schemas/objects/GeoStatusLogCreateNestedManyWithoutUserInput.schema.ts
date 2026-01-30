import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoStatusLogCreateWithoutUserInputObjectSchema as GeoStatusLogCreateWithoutUserInputObjectSchema } from './GeoStatusLogCreateWithoutUserInput.schema';
import { GeoStatusLogUncheckedCreateWithoutUserInputObjectSchema as GeoStatusLogUncheckedCreateWithoutUserInputObjectSchema } from './GeoStatusLogUncheckedCreateWithoutUserInput.schema';
import { GeoStatusLogCreateOrConnectWithoutUserInputObjectSchema as GeoStatusLogCreateOrConnectWithoutUserInputObjectSchema } from './GeoStatusLogCreateOrConnectWithoutUserInput.schema';
import { GeoStatusLogCreateManyUserInputEnvelopeObjectSchema as GeoStatusLogCreateManyUserInputEnvelopeObjectSchema } from './GeoStatusLogCreateManyUserInputEnvelope.schema';
import { GeoStatusLogWhereUniqueInputObjectSchema as GeoStatusLogWhereUniqueInputObjectSchema } from './GeoStatusLogWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => GeoStatusLogCreateWithoutUserInputObjectSchema), z.lazy(() => GeoStatusLogCreateWithoutUserInputObjectSchema).array(), z.lazy(() => GeoStatusLogUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => GeoStatusLogUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => GeoStatusLogCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => GeoStatusLogCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => GeoStatusLogCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => GeoStatusLogWhereUniqueInputObjectSchema), z.lazy(() => GeoStatusLogWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const GeoStatusLogCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.GeoStatusLogCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoStatusLogCreateNestedManyWithoutUserInput>;
export const GeoStatusLogCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
