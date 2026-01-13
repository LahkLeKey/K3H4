import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryWhereInputObjectSchema as AgricultureInventoryWhereInputObjectSchema } from './AgricultureInventoryWhereInput.schema';
import { AgricultureInventoryUpdateWithoutMovementsInputObjectSchema as AgricultureInventoryUpdateWithoutMovementsInputObjectSchema } from './AgricultureInventoryUpdateWithoutMovementsInput.schema';
import { AgricultureInventoryUncheckedUpdateWithoutMovementsInputObjectSchema as AgricultureInventoryUncheckedUpdateWithoutMovementsInputObjectSchema } from './AgricultureInventoryUncheckedUpdateWithoutMovementsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureInventoryWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => AgricultureInventoryUpdateWithoutMovementsInputObjectSchema), z.lazy(() => AgricultureInventoryUncheckedUpdateWithoutMovementsInputObjectSchema)])
}).strict();
export const AgricultureInventoryUpdateToOneWithWhereWithoutMovementsInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryUpdateToOneWithWhereWithoutMovementsInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryUpdateToOneWithWhereWithoutMovementsInput>;
export const AgricultureInventoryUpdateToOneWithWhereWithoutMovementsInputObjectZodSchema = makeSchema();
