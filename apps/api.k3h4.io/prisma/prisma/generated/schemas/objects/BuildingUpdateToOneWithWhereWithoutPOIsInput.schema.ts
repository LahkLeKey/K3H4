import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BuildingWhereInputObjectSchema as BuildingWhereInputObjectSchema } from './BuildingWhereInput.schema';
import { BuildingUpdateWithoutPOIsInputObjectSchema as BuildingUpdateWithoutPOIsInputObjectSchema } from './BuildingUpdateWithoutPOIsInput.schema';
import { BuildingUncheckedUpdateWithoutPOIsInputObjectSchema as BuildingUncheckedUpdateWithoutPOIsInputObjectSchema } from './BuildingUncheckedUpdateWithoutPOIsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => BuildingWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => BuildingUpdateWithoutPOIsInputObjectSchema), z.lazy(() => BuildingUncheckedUpdateWithoutPOIsInputObjectSchema)])
}).strict();
export const BuildingUpdateToOneWithWhereWithoutPOIsInputObjectSchema: z.ZodType<Prisma.BuildingUpdateToOneWithWhereWithoutPOIsInput> = makeSchema() as unknown as z.ZodType<Prisma.BuildingUpdateToOneWithWhereWithoutPOIsInput>;
export const BuildingUpdateToOneWithWhereWithoutPOIsInputObjectZodSchema = makeSchema();
