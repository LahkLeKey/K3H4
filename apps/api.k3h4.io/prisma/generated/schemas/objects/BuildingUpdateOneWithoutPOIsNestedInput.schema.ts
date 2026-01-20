import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BuildingCreateWithoutPOIsInputObjectSchema as BuildingCreateWithoutPOIsInputObjectSchema } from './BuildingCreateWithoutPOIsInput.schema';
import { BuildingUncheckedCreateWithoutPOIsInputObjectSchema as BuildingUncheckedCreateWithoutPOIsInputObjectSchema } from './BuildingUncheckedCreateWithoutPOIsInput.schema';
import { BuildingCreateOrConnectWithoutPOIsInputObjectSchema as BuildingCreateOrConnectWithoutPOIsInputObjectSchema } from './BuildingCreateOrConnectWithoutPOIsInput.schema';
import { BuildingUpsertWithoutPOIsInputObjectSchema as BuildingUpsertWithoutPOIsInputObjectSchema } from './BuildingUpsertWithoutPOIsInput.schema';
import { BuildingWhereInputObjectSchema as BuildingWhereInputObjectSchema } from './BuildingWhereInput.schema';
import { BuildingWhereUniqueInputObjectSchema as BuildingWhereUniqueInputObjectSchema } from './BuildingWhereUniqueInput.schema';
import { BuildingUpdateToOneWithWhereWithoutPOIsInputObjectSchema as BuildingUpdateToOneWithWhereWithoutPOIsInputObjectSchema } from './BuildingUpdateToOneWithWhereWithoutPOIsInput.schema';
import { BuildingUpdateWithoutPOIsInputObjectSchema as BuildingUpdateWithoutPOIsInputObjectSchema } from './BuildingUpdateWithoutPOIsInput.schema';
import { BuildingUncheckedUpdateWithoutPOIsInputObjectSchema as BuildingUncheckedUpdateWithoutPOIsInputObjectSchema } from './BuildingUncheckedUpdateWithoutPOIsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => BuildingCreateWithoutPOIsInputObjectSchema), z.lazy(() => BuildingUncheckedCreateWithoutPOIsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => BuildingCreateOrConnectWithoutPOIsInputObjectSchema).optional(),
  upsert: z.lazy(() => BuildingUpsertWithoutPOIsInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => BuildingWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => BuildingWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => BuildingWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => BuildingUpdateToOneWithWhereWithoutPOIsInputObjectSchema), z.lazy(() => BuildingUpdateWithoutPOIsInputObjectSchema), z.lazy(() => BuildingUncheckedUpdateWithoutPOIsInputObjectSchema)]).optional()
}).strict();
export const BuildingUpdateOneWithoutPOIsNestedInputObjectSchema: z.ZodType<Prisma.BuildingUpdateOneWithoutPOIsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.BuildingUpdateOneWithoutPOIsNestedInput>;
export const BuildingUpdateOneWithoutPOIsNestedInputObjectZodSchema = makeSchema();
