import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BuildingCreateWithoutPOIsInputObjectSchema as BuildingCreateWithoutPOIsInputObjectSchema } from './BuildingCreateWithoutPOIsInput.schema';
import { BuildingUncheckedCreateWithoutPOIsInputObjectSchema as BuildingUncheckedCreateWithoutPOIsInputObjectSchema } from './BuildingUncheckedCreateWithoutPOIsInput.schema';
import { BuildingCreateOrConnectWithoutPOIsInputObjectSchema as BuildingCreateOrConnectWithoutPOIsInputObjectSchema } from './BuildingCreateOrConnectWithoutPOIsInput.schema';
import { BuildingWhereUniqueInputObjectSchema as BuildingWhereUniqueInputObjectSchema } from './BuildingWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => BuildingCreateWithoutPOIsInputObjectSchema), z.lazy(() => BuildingUncheckedCreateWithoutPOIsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => BuildingCreateOrConnectWithoutPOIsInputObjectSchema).optional(),
  connect: z.lazy(() => BuildingWhereUniqueInputObjectSchema).optional()
}).strict();
export const BuildingCreateNestedOneWithoutPOIsInputObjectSchema: z.ZodType<Prisma.BuildingCreateNestedOneWithoutPOIsInput> = makeSchema() as unknown as z.ZodType<Prisma.BuildingCreateNestedOneWithoutPOIsInput>;
export const BuildingCreateNestedOneWithoutPOIsInputObjectZodSchema = makeSchema();
