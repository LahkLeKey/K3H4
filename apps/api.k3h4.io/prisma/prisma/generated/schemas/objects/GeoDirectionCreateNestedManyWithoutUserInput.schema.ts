import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionCreateWithoutUserInputObjectSchema as GeoDirectionCreateWithoutUserInputObjectSchema } from './GeoDirectionCreateWithoutUserInput.schema';
import { GeoDirectionUncheckedCreateWithoutUserInputObjectSchema as GeoDirectionUncheckedCreateWithoutUserInputObjectSchema } from './GeoDirectionUncheckedCreateWithoutUserInput.schema';
import { GeoDirectionCreateOrConnectWithoutUserInputObjectSchema as GeoDirectionCreateOrConnectWithoutUserInputObjectSchema } from './GeoDirectionCreateOrConnectWithoutUserInput.schema';
import { GeoDirectionCreateManyUserInputEnvelopeObjectSchema as GeoDirectionCreateManyUserInputEnvelopeObjectSchema } from './GeoDirectionCreateManyUserInputEnvelope.schema';
import { GeoDirectionWhereUniqueInputObjectSchema as GeoDirectionWhereUniqueInputObjectSchema } from './GeoDirectionWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => GeoDirectionCreateWithoutUserInputObjectSchema), z.lazy(() => GeoDirectionCreateWithoutUserInputObjectSchema).array(), z.lazy(() => GeoDirectionUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => GeoDirectionUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => GeoDirectionCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => GeoDirectionCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => GeoDirectionCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema), z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const GeoDirectionCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.GeoDirectionCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionCreateNestedManyWithoutUserInput>;
export const GeoDirectionCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
