import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureShipmentWhereUniqueInputObjectSchema as AgricultureShipmentWhereUniqueInputObjectSchema } from './AgricultureShipmentWhereUniqueInput.schema';
import { AgricultureShipmentUpdateWithoutUserInputObjectSchema as AgricultureShipmentUpdateWithoutUserInputObjectSchema } from './AgricultureShipmentUpdateWithoutUserInput.schema';
import { AgricultureShipmentUncheckedUpdateWithoutUserInputObjectSchema as AgricultureShipmentUncheckedUpdateWithoutUserInputObjectSchema } from './AgricultureShipmentUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureShipmentWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => AgricultureShipmentUpdateWithoutUserInputObjectSchema), z.lazy(() => AgricultureShipmentUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const AgricultureShipmentUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.AgricultureShipmentUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentUpdateWithWhereUniqueWithoutUserInput>;
export const AgricultureShipmentUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
