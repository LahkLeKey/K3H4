import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureShipmentWhereUniqueInputObjectSchema as AgricultureShipmentWhereUniqueInputObjectSchema } from './AgricultureShipmentWhereUniqueInput.schema';
import { AgricultureShipmentUpdateWithoutUserInputObjectSchema as AgricultureShipmentUpdateWithoutUserInputObjectSchema } from './AgricultureShipmentUpdateWithoutUserInput.schema';
import { AgricultureShipmentUncheckedUpdateWithoutUserInputObjectSchema as AgricultureShipmentUncheckedUpdateWithoutUserInputObjectSchema } from './AgricultureShipmentUncheckedUpdateWithoutUserInput.schema';
import { AgricultureShipmentCreateWithoutUserInputObjectSchema as AgricultureShipmentCreateWithoutUserInputObjectSchema } from './AgricultureShipmentCreateWithoutUserInput.schema';
import { AgricultureShipmentUncheckedCreateWithoutUserInputObjectSchema as AgricultureShipmentUncheckedCreateWithoutUserInputObjectSchema } from './AgricultureShipmentUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureShipmentWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => AgricultureShipmentUpdateWithoutUserInputObjectSchema), z.lazy(() => AgricultureShipmentUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => AgricultureShipmentCreateWithoutUserInputObjectSchema), z.lazy(() => AgricultureShipmentUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const AgricultureShipmentUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.AgricultureShipmentUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentUpsertWithWhereUniqueWithoutUserInput>;
export const AgricultureShipmentUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
