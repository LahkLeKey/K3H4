import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryUpdateWithoutMovementsInputObjectSchema as AgricultureInventoryUpdateWithoutMovementsInputObjectSchema } from './AgricultureInventoryUpdateWithoutMovementsInput.schema';
import { AgricultureInventoryUncheckedUpdateWithoutMovementsInputObjectSchema as AgricultureInventoryUncheckedUpdateWithoutMovementsInputObjectSchema } from './AgricultureInventoryUncheckedUpdateWithoutMovementsInput.schema';
import { AgricultureInventoryCreateWithoutMovementsInputObjectSchema as AgricultureInventoryCreateWithoutMovementsInputObjectSchema } from './AgricultureInventoryCreateWithoutMovementsInput.schema';
import { AgricultureInventoryUncheckedCreateWithoutMovementsInputObjectSchema as AgricultureInventoryUncheckedCreateWithoutMovementsInputObjectSchema } from './AgricultureInventoryUncheckedCreateWithoutMovementsInput.schema';
import { AgricultureInventoryWhereInputObjectSchema as AgricultureInventoryWhereInputObjectSchema } from './AgricultureInventoryWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => AgricultureInventoryUpdateWithoutMovementsInputObjectSchema), z.lazy(() => AgricultureInventoryUncheckedUpdateWithoutMovementsInputObjectSchema)]),
  create: z.union([z.lazy(() => AgricultureInventoryCreateWithoutMovementsInputObjectSchema), z.lazy(() => AgricultureInventoryUncheckedCreateWithoutMovementsInputObjectSchema)]),
  where: z.lazy(() => AgricultureInventoryWhereInputObjectSchema).optional()
}).strict();
export const AgricultureInventoryUpsertWithoutMovementsInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryUpsertWithoutMovementsInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryUpsertWithoutMovementsInput>;
export const AgricultureInventoryUpsertWithoutMovementsInputObjectZodSchema = makeSchema();
