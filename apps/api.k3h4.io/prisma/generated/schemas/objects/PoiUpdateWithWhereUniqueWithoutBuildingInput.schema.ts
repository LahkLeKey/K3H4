import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PoiWhereUniqueInputObjectSchema as PoiWhereUniqueInputObjectSchema } from './PoiWhereUniqueInput.schema';
import { PoiUpdateWithoutBuildingInputObjectSchema as PoiUpdateWithoutBuildingInputObjectSchema } from './PoiUpdateWithoutBuildingInput.schema';
import { PoiUncheckedUpdateWithoutBuildingInputObjectSchema as PoiUncheckedUpdateWithoutBuildingInputObjectSchema } from './PoiUncheckedUpdateWithoutBuildingInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PoiWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => PoiUpdateWithoutBuildingInputObjectSchema), z.lazy(() => PoiUncheckedUpdateWithoutBuildingInputObjectSchema)])
}).strict();
export const PoiUpdateWithWhereUniqueWithoutBuildingInputObjectSchema: z.ZodType<Prisma.PoiUpdateWithWhereUniqueWithoutBuildingInput> = makeSchema() as unknown as z.ZodType<Prisma.PoiUpdateWithWhereUniqueWithoutBuildingInput>;
export const PoiUpdateWithWhereUniqueWithoutBuildingInputObjectZodSchema = makeSchema();
