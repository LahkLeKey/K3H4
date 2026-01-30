import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PoiWhereUniqueInputObjectSchema as PoiWhereUniqueInputObjectSchema } from './PoiWhereUniqueInput.schema';
import { PoiCreateWithoutBuildingInputObjectSchema as PoiCreateWithoutBuildingInputObjectSchema } from './PoiCreateWithoutBuildingInput.schema';
import { PoiUncheckedCreateWithoutBuildingInputObjectSchema as PoiUncheckedCreateWithoutBuildingInputObjectSchema } from './PoiUncheckedCreateWithoutBuildingInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PoiWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PoiCreateWithoutBuildingInputObjectSchema), z.lazy(() => PoiUncheckedCreateWithoutBuildingInputObjectSchema)])
}).strict();
export const PoiCreateOrConnectWithoutBuildingInputObjectSchema: z.ZodType<Prisma.PoiCreateOrConnectWithoutBuildingInput> = makeSchema() as unknown as z.ZodType<Prisma.PoiCreateOrConnectWithoutBuildingInput>;
export const PoiCreateOrConnectWithoutBuildingInputObjectZodSchema = makeSchema();
