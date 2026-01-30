import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PoiWhereUniqueInputObjectSchema as PoiWhereUniqueInputObjectSchema } from './PoiWhereUniqueInput.schema';
import { PoiUpdateWithoutBuildingInputObjectSchema as PoiUpdateWithoutBuildingInputObjectSchema } from './PoiUpdateWithoutBuildingInput.schema';
import { PoiUncheckedUpdateWithoutBuildingInputObjectSchema as PoiUncheckedUpdateWithoutBuildingInputObjectSchema } from './PoiUncheckedUpdateWithoutBuildingInput.schema';
import { PoiCreateWithoutBuildingInputObjectSchema as PoiCreateWithoutBuildingInputObjectSchema } from './PoiCreateWithoutBuildingInput.schema';
import { PoiUncheckedCreateWithoutBuildingInputObjectSchema as PoiUncheckedCreateWithoutBuildingInputObjectSchema } from './PoiUncheckedCreateWithoutBuildingInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PoiWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => PoiUpdateWithoutBuildingInputObjectSchema), z.lazy(() => PoiUncheckedUpdateWithoutBuildingInputObjectSchema)]),
  create: z.union([z.lazy(() => PoiCreateWithoutBuildingInputObjectSchema), z.lazy(() => PoiUncheckedCreateWithoutBuildingInputObjectSchema)])
}).strict();
export const PoiUpsertWithWhereUniqueWithoutBuildingInputObjectSchema: z.ZodType<Prisma.PoiUpsertWithWhereUniqueWithoutBuildingInput> = makeSchema() as unknown as z.ZodType<Prisma.PoiUpsertWithWhereUniqueWithoutBuildingInput>;
export const PoiUpsertWithWhereUniqueWithoutBuildingInputObjectZodSchema = makeSchema();
