import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureShipmentCreateWithoutInventoryMovementsInputObjectSchema as AgricultureShipmentCreateWithoutInventoryMovementsInputObjectSchema } from './AgricultureShipmentCreateWithoutInventoryMovementsInput.schema';
import { AgricultureShipmentUncheckedCreateWithoutInventoryMovementsInputObjectSchema as AgricultureShipmentUncheckedCreateWithoutInventoryMovementsInputObjectSchema } from './AgricultureShipmentUncheckedCreateWithoutInventoryMovementsInput.schema';
import { AgricultureShipmentCreateOrConnectWithoutInventoryMovementsInputObjectSchema as AgricultureShipmentCreateOrConnectWithoutInventoryMovementsInputObjectSchema } from './AgricultureShipmentCreateOrConnectWithoutInventoryMovementsInput.schema';
import { AgricultureShipmentWhereUniqueInputObjectSchema as AgricultureShipmentWhereUniqueInputObjectSchema } from './AgricultureShipmentWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgricultureShipmentCreateWithoutInventoryMovementsInputObjectSchema), z.lazy(() => AgricultureShipmentUncheckedCreateWithoutInventoryMovementsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => AgricultureShipmentCreateOrConnectWithoutInventoryMovementsInputObjectSchema).optional(),
  connect: z.lazy(() => AgricultureShipmentWhereUniqueInputObjectSchema).optional()
}).strict();
export const AgricultureShipmentCreateNestedOneWithoutInventoryMovementsInputObjectSchema: z.ZodType<Prisma.AgricultureShipmentCreateNestedOneWithoutInventoryMovementsInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentCreateNestedOneWithoutInventoryMovementsInput>;
export const AgricultureShipmentCreateNestedOneWithoutInventoryMovementsInputObjectZodSchema = makeSchema();
