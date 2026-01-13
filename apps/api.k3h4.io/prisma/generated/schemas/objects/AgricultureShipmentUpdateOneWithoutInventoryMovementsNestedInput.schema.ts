import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureShipmentCreateWithoutInventoryMovementsInputObjectSchema as AgricultureShipmentCreateWithoutInventoryMovementsInputObjectSchema } from './AgricultureShipmentCreateWithoutInventoryMovementsInput.schema';
import { AgricultureShipmentUncheckedCreateWithoutInventoryMovementsInputObjectSchema as AgricultureShipmentUncheckedCreateWithoutInventoryMovementsInputObjectSchema } from './AgricultureShipmentUncheckedCreateWithoutInventoryMovementsInput.schema';
import { AgricultureShipmentCreateOrConnectWithoutInventoryMovementsInputObjectSchema as AgricultureShipmentCreateOrConnectWithoutInventoryMovementsInputObjectSchema } from './AgricultureShipmentCreateOrConnectWithoutInventoryMovementsInput.schema';
import { AgricultureShipmentUpsertWithoutInventoryMovementsInputObjectSchema as AgricultureShipmentUpsertWithoutInventoryMovementsInputObjectSchema } from './AgricultureShipmentUpsertWithoutInventoryMovementsInput.schema';
import { AgricultureShipmentWhereInputObjectSchema as AgricultureShipmentWhereInputObjectSchema } from './AgricultureShipmentWhereInput.schema';
import { AgricultureShipmentWhereUniqueInputObjectSchema as AgricultureShipmentWhereUniqueInputObjectSchema } from './AgricultureShipmentWhereUniqueInput.schema';
import { AgricultureShipmentUpdateToOneWithWhereWithoutInventoryMovementsInputObjectSchema as AgricultureShipmentUpdateToOneWithWhereWithoutInventoryMovementsInputObjectSchema } from './AgricultureShipmentUpdateToOneWithWhereWithoutInventoryMovementsInput.schema';
import { AgricultureShipmentUpdateWithoutInventoryMovementsInputObjectSchema as AgricultureShipmentUpdateWithoutInventoryMovementsInputObjectSchema } from './AgricultureShipmentUpdateWithoutInventoryMovementsInput.schema';
import { AgricultureShipmentUncheckedUpdateWithoutInventoryMovementsInputObjectSchema as AgricultureShipmentUncheckedUpdateWithoutInventoryMovementsInputObjectSchema } from './AgricultureShipmentUncheckedUpdateWithoutInventoryMovementsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgricultureShipmentCreateWithoutInventoryMovementsInputObjectSchema), z.lazy(() => AgricultureShipmentUncheckedCreateWithoutInventoryMovementsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => AgricultureShipmentCreateOrConnectWithoutInventoryMovementsInputObjectSchema).optional(),
  upsert: z.lazy(() => AgricultureShipmentUpsertWithoutInventoryMovementsInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => AgricultureShipmentWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => AgricultureShipmentWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => AgricultureShipmentWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => AgricultureShipmentUpdateToOneWithWhereWithoutInventoryMovementsInputObjectSchema), z.lazy(() => AgricultureShipmentUpdateWithoutInventoryMovementsInputObjectSchema), z.lazy(() => AgricultureShipmentUncheckedUpdateWithoutInventoryMovementsInputObjectSchema)]).optional()
}).strict();
export const AgricultureShipmentUpdateOneWithoutInventoryMovementsNestedInputObjectSchema: z.ZodType<Prisma.AgricultureShipmentUpdateOneWithoutInventoryMovementsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentUpdateOneWithoutInventoryMovementsNestedInput>;
export const AgricultureShipmentUpdateOneWithoutInventoryMovementsNestedInputObjectZodSchema = makeSchema();
