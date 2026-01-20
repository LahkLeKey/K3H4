import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PoiCreateWithoutBuildingInputObjectSchema as PoiCreateWithoutBuildingInputObjectSchema } from './PoiCreateWithoutBuildingInput.schema';
import { PoiUncheckedCreateWithoutBuildingInputObjectSchema as PoiUncheckedCreateWithoutBuildingInputObjectSchema } from './PoiUncheckedCreateWithoutBuildingInput.schema';
import { PoiCreateOrConnectWithoutBuildingInputObjectSchema as PoiCreateOrConnectWithoutBuildingInputObjectSchema } from './PoiCreateOrConnectWithoutBuildingInput.schema';
import { PoiCreateManyBuildingInputEnvelopeObjectSchema as PoiCreateManyBuildingInputEnvelopeObjectSchema } from './PoiCreateManyBuildingInputEnvelope.schema';
import { PoiWhereUniqueInputObjectSchema as PoiWhereUniqueInputObjectSchema } from './PoiWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PoiCreateWithoutBuildingInputObjectSchema), z.lazy(() => PoiCreateWithoutBuildingInputObjectSchema).array(), z.lazy(() => PoiUncheckedCreateWithoutBuildingInputObjectSchema), z.lazy(() => PoiUncheckedCreateWithoutBuildingInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PoiCreateOrConnectWithoutBuildingInputObjectSchema), z.lazy(() => PoiCreateOrConnectWithoutBuildingInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PoiCreateManyBuildingInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => PoiWhereUniqueInputObjectSchema), z.lazy(() => PoiWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const PoiCreateNestedManyWithoutBuildingInputObjectSchema: z.ZodType<Prisma.PoiCreateNestedManyWithoutBuildingInput> = makeSchema() as unknown as z.ZodType<Prisma.PoiCreateNestedManyWithoutBuildingInput>;
export const PoiCreateNestedManyWithoutBuildingInputObjectZodSchema = makeSchema();
