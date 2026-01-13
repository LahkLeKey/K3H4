import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryMovementScalarWhereInputObjectSchema as AgricultureInventoryMovementScalarWhereInputObjectSchema } from './AgricultureInventoryMovementScalarWhereInput.schema';
import { AgricultureInventoryMovementUpdateManyMutationInputObjectSchema as AgricultureInventoryMovementUpdateManyMutationInputObjectSchema } from './AgricultureInventoryMovementUpdateManyMutationInput.schema';
import { AgricultureInventoryMovementUncheckedUpdateManyWithoutShipmentInputObjectSchema as AgricultureInventoryMovementUncheckedUpdateManyWithoutShipmentInputObjectSchema } from './AgricultureInventoryMovementUncheckedUpdateManyWithoutShipmentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureInventoryMovementScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => AgricultureInventoryMovementUpdateManyMutationInputObjectSchema), z.lazy(() => AgricultureInventoryMovementUncheckedUpdateManyWithoutShipmentInputObjectSchema)])
}).strict();
export const AgricultureInventoryMovementUpdateManyWithWhereWithoutShipmentInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryMovementUpdateManyWithWhereWithoutShipmentInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementUpdateManyWithWhereWithoutShipmentInput>;
export const AgricultureInventoryMovementUpdateManyWithWhereWithoutShipmentInputObjectZodSchema = makeSchema();
