import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureShipmentWhereUniqueInputObjectSchema as AgricultureShipmentWhereUniqueInputObjectSchema } from './AgricultureShipmentWhereUniqueInput.schema';
import { AgricultureShipmentCreateWithoutUserInputObjectSchema as AgricultureShipmentCreateWithoutUserInputObjectSchema } from './AgricultureShipmentCreateWithoutUserInput.schema';
import { AgricultureShipmentUncheckedCreateWithoutUserInputObjectSchema as AgricultureShipmentUncheckedCreateWithoutUserInputObjectSchema } from './AgricultureShipmentUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureShipmentWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => AgricultureShipmentCreateWithoutUserInputObjectSchema), z.lazy(() => AgricultureShipmentUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const AgricultureShipmentCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.AgricultureShipmentCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentCreateOrConnectWithoutUserInput>;
export const AgricultureShipmentCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
