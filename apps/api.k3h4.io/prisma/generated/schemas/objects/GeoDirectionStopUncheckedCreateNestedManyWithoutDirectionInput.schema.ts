import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionStopCreateWithoutDirectionInputObjectSchema as GeoDirectionStopCreateWithoutDirectionInputObjectSchema } from './GeoDirectionStopCreateWithoutDirectionInput.schema';
import { GeoDirectionStopUncheckedCreateWithoutDirectionInputObjectSchema as GeoDirectionStopUncheckedCreateWithoutDirectionInputObjectSchema } from './GeoDirectionStopUncheckedCreateWithoutDirectionInput.schema';
import { GeoDirectionStopCreateOrConnectWithoutDirectionInputObjectSchema as GeoDirectionStopCreateOrConnectWithoutDirectionInputObjectSchema } from './GeoDirectionStopCreateOrConnectWithoutDirectionInput.schema';
import { GeoDirectionStopCreateManyDirectionInputEnvelopeObjectSchema as GeoDirectionStopCreateManyDirectionInputEnvelopeObjectSchema } from './GeoDirectionStopCreateManyDirectionInputEnvelope.schema';
import { GeoDirectionStopWhereUniqueInputObjectSchema as GeoDirectionStopWhereUniqueInputObjectSchema } from './GeoDirectionStopWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => GeoDirectionStopCreateWithoutDirectionInputObjectSchema), z.lazy(() => GeoDirectionStopCreateWithoutDirectionInputObjectSchema).array(), z.lazy(() => GeoDirectionStopUncheckedCreateWithoutDirectionInputObjectSchema), z.lazy(() => GeoDirectionStopUncheckedCreateWithoutDirectionInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => GeoDirectionStopCreateOrConnectWithoutDirectionInputObjectSchema), z.lazy(() => GeoDirectionStopCreateOrConnectWithoutDirectionInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => GeoDirectionStopCreateManyDirectionInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => GeoDirectionStopWhereUniqueInputObjectSchema), z.lazy(() => GeoDirectionStopWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const GeoDirectionStopUncheckedCreateNestedManyWithoutDirectionInputObjectSchema: z.ZodType<Prisma.GeoDirectionStopUncheckedCreateNestedManyWithoutDirectionInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionStopUncheckedCreateNestedManyWithoutDirectionInput>;
export const GeoDirectionStopUncheckedCreateNestedManyWithoutDirectionInputObjectZodSchema = makeSchema();
