import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryCreateWithoutMovementsInputObjectSchema as AgricultureInventoryCreateWithoutMovementsInputObjectSchema } from './AgricultureInventoryCreateWithoutMovementsInput.schema';
import { AgricultureInventoryUncheckedCreateWithoutMovementsInputObjectSchema as AgricultureInventoryUncheckedCreateWithoutMovementsInputObjectSchema } from './AgricultureInventoryUncheckedCreateWithoutMovementsInput.schema';
import { AgricultureInventoryCreateOrConnectWithoutMovementsInputObjectSchema as AgricultureInventoryCreateOrConnectWithoutMovementsInputObjectSchema } from './AgricultureInventoryCreateOrConnectWithoutMovementsInput.schema';
import { AgricultureInventoryUpsertWithoutMovementsInputObjectSchema as AgricultureInventoryUpsertWithoutMovementsInputObjectSchema } from './AgricultureInventoryUpsertWithoutMovementsInput.schema';
import { AgricultureInventoryWhereUniqueInputObjectSchema as AgricultureInventoryWhereUniqueInputObjectSchema } from './AgricultureInventoryWhereUniqueInput.schema';
import { AgricultureInventoryUpdateToOneWithWhereWithoutMovementsInputObjectSchema as AgricultureInventoryUpdateToOneWithWhereWithoutMovementsInputObjectSchema } from './AgricultureInventoryUpdateToOneWithWhereWithoutMovementsInput.schema';
import { AgricultureInventoryUpdateWithoutMovementsInputObjectSchema as AgricultureInventoryUpdateWithoutMovementsInputObjectSchema } from './AgricultureInventoryUpdateWithoutMovementsInput.schema';
import { AgricultureInventoryUncheckedUpdateWithoutMovementsInputObjectSchema as AgricultureInventoryUncheckedUpdateWithoutMovementsInputObjectSchema } from './AgricultureInventoryUncheckedUpdateWithoutMovementsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgricultureInventoryCreateWithoutMovementsInputObjectSchema), z.lazy(() => AgricultureInventoryUncheckedCreateWithoutMovementsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => AgricultureInventoryCreateOrConnectWithoutMovementsInputObjectSchema).optional(),
  upsert: z.lazy(() => AgricultureInventoryUpsertWithoutMovementsInputObjectSchema).optional(),
  connect: z.lazy(() => AgricultureInventoryWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => AgricultureInventoryUpdateToOneWithWhereWithoutMovementsInputObjectSchema), z.lazy(() => AgricultureInventoryUpdateWithoutMovementsInputObjectSchema), z.lazy(() => AgricultureInventoryUncheckedUpdateWithoutMovementsInputObjectSchema)]).optional()
}).strict();
export const AgricultureInventoryUpdateOneRequiredWithoutMovementsNestedInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryUpdateOneRequiredWithoutMovementsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryUpdateOneRequiredWithoutMovementsNestedInput>;
export const AgricultureInventoryUpdateOneRequiredWithoutMovementsNestedInputObjectZodSchema = makeSchema();
