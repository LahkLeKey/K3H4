import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionCreateWithoutActorInputObjectSchema as GeoDirectionCreateWithoutActorInputObjectSchema } from './GeoDirectionCreateWithoutActorInput.schema';
import { GeoDirectionUncheckedCreateWithoutActorInputObjectSchema as GeoDirectionUncheckedCreateWithoutActorInputObjectSchema } from './GeoDirectionUncheckedCreateWithoutActorInput.schema';
import { GeoDirectionCreateOrConnectWithoutActorInputObjectSchema as GeoDirectionCreateOrConnectWithoutActorInputObjectSchema } from './GeoDirectionCreateOrConnectWithoutActorInput.schema';
import { GeoDirectionCreateManyActorInputEnvelopeObjectSchema as GeoDirectionCreateManyActorInputEnvelopeObjectSchema } from './GeoDirectionCreateManyActorInputEnvelope.schema';
import { GeoDirectionWhereUniqueInputObjectSchema as GeoDirectionWhereUniqueInputObjectSchema } from './GeoDirectionWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => GeoDirectionCreateWithoutActorInputObjectSchema), z.lazy(() => GeoDirectionCreateWithoutActorInputObjectSchema).array(), z.lazy(() => GeoDirectionUncheckedCreateWithoutActorInputObjectSchema), z.lazy(() => GeoDirectionUncheckedCreateWithoutActorInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => GeoDirectionCreateOrConnectWithoutActorInputObjectSchema), z.lazy(() => GeoDirectionCreateOrConnectWithoutActorInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => GeoDirectionCreateManyActorInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema), z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const GeoDirectionCreateNestedManyWithoutActorInputObjectSchema: z.ZodType<Prisma.GeoDirectionCreateNestedManyWithoutActorInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionCreateNestedManyWithoutActorInput>;
export const GeoDirectionCreateNestedManyWithoutActorInputObjectZodSchema = makeSchema();
