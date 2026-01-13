import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryCreateWithoutMovementsInputObjectSchema as AgricultureInventoryCreateWithoutMovementsInputObjectSchema } from './AgricultureInventoryCreateWithoutMovementsInput.schema';
import { AgricultureInventoryUncheckedCreateWithoutMovementsInputObjectSchema as AgricultureInventoryUncheckedCreateWithoutMovementsInputObjectSchema } from './AgricultureInventoryUncheckedCreateWithoutMovementsInput.schema';
import { AgricultureInventoryCreateOrConnectWithoutMovementsInputObjectSchema as AgricultureInventoryCreateOrConnectWithoutMovementsInputObjectSchema } from './AgricultureInventoryCreateOrConnectWithoutMovementsInput.schema';
import { AgricultureInventoryWhereUniqueInputObjectSchema as AgricultureInventoryWhereUniqueInputObjectSchema } from './AgricultureInventoryWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgricultureInventoryCreateWithoutMovementsInputObjectSchema), z.lazy(() => AgricultureInventoryUncheckedCreateWithoutMovementsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => AgricultureInventoryCreateOrConnectWithoutMovementsInputObjectSchema).optional(),
  connect: z.lazy(() => AgricultureInventoryWhereUniqueInputObjectSchema).optional()
}).strict();
export const AgricultureInventoryCreateNestedOneWithoutMovementsInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryCreateNestedOneWithoutMovementsInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryCreateNestedOneWithoutMovementsInput>;
export const AgricultureInventoryCreateNestedOneWithoutMovementsInputObjectZodSchema = makeSchema();
