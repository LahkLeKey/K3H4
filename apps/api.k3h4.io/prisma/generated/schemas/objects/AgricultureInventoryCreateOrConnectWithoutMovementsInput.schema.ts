import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryWhereUniqueInputObjectSchema as AgricultureInventoryWhereUniqueInputObjectSchema } from './AgricultureInventoryWhereUniqueInput.schema';
import { AgricultureInventoryCreateWithoutMovementsInputObjectSchema as AgricultureInventoryCreateWithoutMovementsInputObjectSchema } from './AgricultureInventoryCreateWithoutMovementsInput.schema';
import { AgricultureInventoryUncheckedCreateWithoutMovementsInputObjectSchema as AgricultureInventoryUncheckedCreateWithoutMovementsInputObjectSchema } from './AgricultureInventoryUncheckedCreateWithoutMovementsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureInventoryWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => AgricultureInventoryCreateWithoutMovementsInputObjectSchema), z.lazy(() => AgricultureInventoryUncheckedCreateWithoutMovementsInputObjectSchema)])
}).strict();
export const AgricultureInventoryCreateOrConnectWithoutMovementsInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryCreateOrConnectWithoutMovementsInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryCreateOrConnectWithoutMovementsInput>;
export const AgricultureInventoryCreateOrConnectWithoutMovementsInputObjectZodSchema = makeSchema();
