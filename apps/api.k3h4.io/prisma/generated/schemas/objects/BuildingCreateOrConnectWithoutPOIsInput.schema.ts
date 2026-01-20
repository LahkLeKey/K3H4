import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BuildingWhereUniqueInputObjectSchema as BuildingWhereUniqueInputObjectSchema } from './BuildingWhereUniqueInput.schema';
import { BuildingCreateWithoutPOIsInputObjectSchema as BuildingCreateWithoutPOIsInputObjectSchema } from './BuildingCreateWithoutPOIsInput.schema';
import { BuildingUncheckedCreateWithoutPOIsInputObjectSchema as BuildingUncheckedCreateWithoutPOIsInputObjectSchema } from './BuildingUncheckedCreateWithoutPOIsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => BuildingWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => BuildingCreateWithoutPOIsInputObjectSchema), z.lazy(() => BuildingUncheckedCreateWithoutPOIsInputObjectSchema)])
}).strict();
export const BuildingCreateOrConnectWithoutPOIsInputObjectSchema: z.ZodType<Prisma.BuildingCreateOrConnectWithoutPOIsInput> = makeSchema() as unknown as z.ZodType<Prisma.BuildingCreateOrConnectWithoutPOIsInput>;
export const BuildingCreateOrConnectWithoutPOIsInputObjectZodSchema = makeSchema();
