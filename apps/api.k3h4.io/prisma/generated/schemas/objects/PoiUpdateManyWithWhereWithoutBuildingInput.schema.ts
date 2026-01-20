import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PoiScalarWhereInputObjectSchema as PoiScalarWhereInputObjectSchema } from './PoiScalarWhereInput.schema';
import { PoiUpdateManyMutationInputObjectSchema as PoiUpdateManyMutationInputObjectSchema } from './PoiUpdateManyMutationInput.schema';
import { PoiUncheckedUpdateManyWithoutBuildingInputObjectSchema as PoiUncheckedUpdateManyWithoutBuildingInputObjectSchema } from './PoiUncheckedUpdateManyWithoutBuildingInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PoiScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => PoiUpdateManyMutationInputObjectSchema), z.lazy(() => PoiUncheckedUpdateManyWithoutBuildingInputObjectSchema)])
}).strict();
export const PoiUpdateManyWithWhereWithoutBuildingInputObjectSchema: z.ZodType<Prisma.PoiUpdateManyWithWhereWithoutBuildingInput> = makeSchema() as unknown as z.ZodType<Prisma.PoiUpdateManyWithWhereWithoutBuildingInput>;
export const PoiUpdateManyWithWhereWithoutBuildingInputObjectZodSchema = makeSchema();
