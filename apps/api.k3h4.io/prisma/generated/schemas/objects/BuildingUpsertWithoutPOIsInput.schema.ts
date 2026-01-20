import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BuildingUpdateWithoutPOIsInputObjectSchema as BuildingUpdateWithoutPOIsInputObjectSchema } from './BuildingUpdateWithoutPOIsInput.schema';
import { BuildingUncheckedUpdateWithoutPOIsInputObjectSchema as BuildingUncheckedUpdateWithoutPOIsInputObjectSchema } from './BuildingUncheckedUpdateWithoutPOIsInput.schema';
import { BuildingCreateWithoutPOIsInputObjectSchema as BuildingCreateWithoutPOIsInputObjectSchema } from './BuildingCreateWithoutPOIsInput.schema';
import { BuildingUncheckedCreateWithoutPOIsInputObjectSchema as BuildingUncheckedCreateWithoutPOIsInputObjectSchema } from './BuildingUncheckedCreateWithoutPOIsInput.schema';
import { BuildingWhereInputObjectSchema as BuildingWhereInputObjectSchema } from './BuildingWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => BuildingUpdateWithoutPOIsInputObjectSchema), z.lazy(() => BuildingUncheckedUpdateWithoutPOIsInputObjectSchema)]),
  create: z.union([z.lazy(() => BuildingCreateWithoutPOIsInputObjectSchema), z.lazy(() => BuildingUncheckedCreateWithoutPOIsInputObjectSchema)]),
  where: z.lazy(() => BuildingWhereInputObjectSchema).optional()
}).strict();
export const BuildingUpsertWithoutPOIsInputObjectSchema: z.ZodType<Prisma.BuildingUpsertWithoutPOIsInput> = makeSchema() as unknown as z.ZodType<Prisma.BuildingUpsertWithoutPOIsInput>;
export const BuildingUpsertWithoutPOIsInputObjectZodSchema = makeSchema();
